import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ success: false, message: 'El correo ya está registrado' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const qrToken = crypto.randomBytes(16).toString('hex');

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        qrToken,
        status: 'PENDING',
        role: 'RESIDENTE'
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Usuario registrado correctamente. Esperando aprobación del administrador.',
      userId: user.id
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ success: false, message: 'Error en el servidor' }, { status: 500 });
  }
}
