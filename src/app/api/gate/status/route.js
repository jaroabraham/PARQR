import { NextResponse } from 'next/server';

// Esta ruta será consultada por el ESP32 cada segundo
export async function GET() {
  // Leemos el estado global modificado por la ruta de validación
  // En producción, esto debería obtenerse de una BD o Redis
  const isOpen = global.openGate || false;

  return NextResponse.json({ 
    open: isOpen 
  });
}
