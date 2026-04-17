import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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

export async function PATCH(request) {
  try {
    const decoded = await verifyUser(request);
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'No autorizado' }, { status: 401 });
    }

    const { name, email, password } = await request.json();
    const updateData = {};

    if (name) updateData.name = name;
    if (email) {
      // Check if email is already taken by another user
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing && existing.id !== decoded.userId) {
        return NextResponse.json({ success: false, message: 'El correo ya está en uso' }, { status: 400 });
      }
      updateData.email = email;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.passwordHash = await bcrypt.hash(password, salt);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ success: false, message: 'Nada que actualizar' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: updateData,
      select: { id: true, name: true, email: true, role: true, status: true }
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ success: false, message: 'Error de servidor' }, { status: 500 });
  }
}
