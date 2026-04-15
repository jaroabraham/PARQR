import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-parqr-12345';

async function verifyResident(request) {
  const token = request.cookies.get('auth_token')?.value || request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.status !== 'APPROVED') return null;
    return decoded; // returns { userId, role, status }
  } catch (error) {
    return null;
  }
}

export async function GET(request) {
  try {
    const user = await verifyResident(request);
    if (!user) return NextResponse.json({ success: false, message: 'No autorizado' }, { status: 401 });

    const guests = await prisma.guest.findMany({
      where: { residentId: user.userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, guests });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error servidor' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await verifyResident(request);
    if (!user) return NextResponse.json({ success: false, message: 'No autorizado' }, { status: 401 });

    const { guestName, validHours } = await request.json();
    if (!guestName || !validHours) {
      return NextResponse.json({ success: false, message: 'Faltan datos' }, { status: 400 });
    }

    const qrToken = crypto.randomBytes(16).toString('hex');
    const validFrom = new Date();
    const validUntil = new Date(validFrom.getTime() + validHours * 60 * 60 * 1000);

    const guest = await prisma.guest.create({
      data: {
        residentId: user.userId,
        guestName,
        qrToken,
        validFrom,
        validUntil,
        isUsed: false
      }
    });

    return NextResponse.json({ success: true, guest });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error de creación' }, { status: 500 });
  }
}
