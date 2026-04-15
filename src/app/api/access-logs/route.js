import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-parqr-12345';

async function verifyUser(request) {
  const token = request.cookies.get('auth_token')?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function GET(request) {
  try {
    const decoded = await verifyUser(request);
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'No autorizado' }, { status: 401 });
    }

    let logs;
    if (decoded.role === 'ADMIN') {
      // Admins see everything
      logs = await prisma.accessLog.findMany({
        include: {
          user: { select: { name: true, email: true } },
          guest: { select: { guestName: true } }
        },
        orderBy: { timestamp: 'desc' },
        take: 100
      });
    } else {
      // Residents see their own logs and logs of their guests
      logs = await prisma.accessLog.findMany({
        where: {
          OR: [
            { userId: decoded.userId },
            { guest: { residentId: decoded.userId } }
          ]
        },
        include: {
          user: { select: { name: true, email: true } },
          guest: { select: { guestName: true } }
        },
        orderBy: { timestamp: 'desc' },
        take: 50
      });
    }

    return NextResponse.json({ success: true, logs });
  } catch (error) {
    console.error('Error fetching logs:', error);
    return NextResponse.json({ success: false, message: 'Error de servidor' }, { status: 500 });
  }
}
