import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-parqr-12345';

async function verifyResident(request) {
  const token = request.cookies.get('auth_token')?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.status !== 'APPROVED') return null;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await verifyResident(request);
    if (!user) return NextResponse.json({ success: false, message: 'No autorizado' }, { status: 401 });

    const { id } = await params;
    
    // Check if it belongs to user
    const guest = await prisma.guest.findUnique({ where: { id: parseInt(id) } });
    if (!guest || guest.residentId !== user.userId) {
      return NextResponse.json({ success: false, message: 'Invitado no encontrado o acceso denegado' }, { status: 403 });
    }

    await prisma.guest.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ success: true, message: 'Invitado eliminado correctamente' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error de servidor' }, { status: 500 });
  }
}
