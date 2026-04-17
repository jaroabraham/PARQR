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
      // Anti-Passback: No puede salir si ya está afuera
      if (!resident.isInside) {
        return NextResponse.json({ 
          success: false, 
          message: 'Error: El usuario ya se encuentra fuera del recinto.' 
        }, { status: 403 });
      }

      // Marcar salida del residente
      await prisma.user.update({
        where: { id: resident.id },
        data: { isInside: false }
      });

      // Abrir pluma para salida
      global.openGate = true;
      setTimeout(() => { global.openGate = false; }, 10000);
      
      await prisma.accessLog.create({ 
        data: { userId: resident.id, action: 'EXIT' } 
      });
      
      return NextResponse.json({ 
        success: true, 
        message: 'Salida de Residente válida. Abriendo pluma.',
        resident: resident.name 
      });
    }

    // 2. Si es Invitado (en este sistema los invitados son solo entrada, pero registramos la salida si existe)
    const guest = await prisma.guest.findUnique({ where: { qrToken } });

    if (guest) {
        // Para invitados, simplemente permitimos la salida si el código fue usado para entrar
        if (!guest.isUsed) {
            return NextResponse.json({ success: false, message: 'Este código de invitado aún no ha sido usado para entrar.' }, { status: 403 });
        }

        global.openGate = true;
        setTimeout(() => { global.openGate = false; }, 10000);
        
        await prisma.accessLog.create({ 
            data: { guestId: guest.id, action: 'EXIT' } 
        });

        return NextResponse.json({ 
            success: true, 
            message: 'Salida de Invitado aceptada.',
            resident: guest.guestName 
        });
    }

    return NextResponse.json({ success: false, message: 'Código inválido o desconocido' }, { status: 401 });

  } catch (error) {
    console.error('Exit Error:', error);
    return NextResponse.json({ success: false, message: 'Error en el servidor' }, { status: 500 });
  }
}
