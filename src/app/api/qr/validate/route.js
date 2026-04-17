import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
global.openGate = global.openGate || false;

export async function POST(request) {
  try {
    const { qrToken } = await request.json();

    if (!qrToken) {
      return NextResponse.json({ success: false, message: 'Token no proporcionado' }, { status: 400 });
    }

    // 1. Buscar si el token pertenece a un Residente
    const resident = await prisma.user.findUnique({ where: { qrToken } });

    if (resident) {
      if (resident.status !== 'APPROVED') {
        await prisma.accessLog.create({ data: { userId: resident.id, action: 'DENIED' } });
        return NextResponse.json({ success: false, message: 'Usuario no aprobado' }, { status: 403 });
      }

      const now = new Date();

      // Anti-Passback: No puede entrar si ya está adentro
      if (resident.isInside) {
        await prisma.accessLog.create({ data: { userId: resident.id, action: 'DENIED' } });
        return NextResponse.json({ 
          success: false, 
          message: 'Acceso Denegado: Usted ya se encuentra dentro del recinto.' 
        }, { status: 403 });
      }

      // Cooldown: Esperar 50 segundos entre ingresos
      if (resident.lastAccess) {
        const diffSeconds = (now.getTime() - new Date(resident.lastAccess).getTime()) / 1000;
        if (diffSeconds < 50) {
          return NextResponse.json({ 
            success: false, 
            message: `Acceso Denegado: Espere ${Math.ceil(50 - diffSeconds)} segundos para volver a ingresar.` 
          }, { status: 429 });
        }
      }
      
      // Permitir acceso y actualizar estado del residente
      await prisma.user.update({
        where: { id: resident.id },
        data: { isInside: true, lastAccess: now }
      });

      global.openGate = true;
      setTimeout(() => { global.openGate = false; }, 10000);
      
      await prisma.accessLog.create({ data: { userId: resident.id, action: 'ENTRY' } });
      
      return NextResponse.json({ 
        success: true, 
        message: 'Acceso de Residente válido (Entrada). Abriendo pluma.',
        resident: resident.name 
      });
    }

    // 2. Si no es residente, buscar si es Invitado
    const guest = await prisma.guest.findUnique({ where: { qrToken } });

    if (guest) {
      const now = new Date();
      if (now < guest.validFrom || now > guest.validUntil || guest.isUsed) {
        await prisma.accessLog.create({ data: { guestId: guest.id, action: 'DENIED' } });
        return NextResponse.json({ success: false, message: 'Código inválido, usado o expirado' }, { status: 401 });
      }

      // Permitir acceso y marcar usado
      await prisma.guest.update({ where: { id: guest.id }, data: { isUsed: true } });
      
      global.openGate = true;
      setTimeout(() => { global.openGate = false; }, 10000);
      
      await prisma.accessLog.create({ data: { guestId: guest.id, action: 'ENTRY' } });
      
      return NextResponse.json({ 
        success: true, 
        message: 'Acceso de Invitado válido. Abriendo pluma.',
        resident: guest.guestName 
      });
    }

    // Si no coincide con ninguno
    return NextResponse.json({ success: false, message: 'Código inválido o desconocido' }, { status: 401 });

  } catch (error) {
    console.error('Validation Error:', error);
    return NextResponse.json({ success: false, message: 'Error en el servidor' }, { status: 500 });
  }
}
