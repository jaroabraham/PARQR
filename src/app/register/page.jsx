"use client";
import AuthLayout from '@/components/AuthLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const name = e.target[0].value;
      const lote = e.target[1].value;
      const email = e.target[2].value;
      const password = e.target[3].value;

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `${name} (${lote})`, email, password })
      });

      const data = await res.json();
      
      if (res.ok && data.success) {
        alert('Cuenta creada exitosamente. Tu administrador debe aprobar tu cuenta antes de iniciar sesión.');
        router.push('/login');
      } else {
        alert(data.message || 'Error al registrarse');
      }
    } catch (error) {
      alert('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Crea tu cuenta" 
      subtitle="Regístrate como residente del fraccionamiento"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#cbd5e1' }}>
            Nombre Completo
          </label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Ej. Juan Pérez" 
            required 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#cbd5e1' }}>
            Lote o Casa
          </label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Ej. Manzana 3 Lote 12" 
            required 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#cbd5e1' }}>
            Correo Electrónico
          </label>
          <input 
            type="email" 
            className="input-field" 
            placeholder="tu@correo.com" 
            required 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#cbd5e1' }}>
            Contraseña
          </label>
          <input 
            type="password" 
            className="input-field" 
            placeholder="••••••••" 
            required 
          />
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Registrarse'}
        </button>

        <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', color: '#94a3b8' }}>
          ¿Ya tienes cuenta? <Link href="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Inicia sesión</Link>
        </div>
      </form>
    </AuthLayout>
  );
}
