"use client";
import AuthLayout from '@/components/AuthLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const email = e.target[0].value;
      const password = e.target[1].value;

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      
      if (res.ok && data.success) {
        router.push('/dashboard');
      } else {
        alert(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      alert('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Bienvenido de nuevo" 
      subtitle="Ingresa a tu cuenta para generar tu acceso"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
          {loading ? 'Iniciando...' : 'Iniciar Sesión'}
        </button>

        <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', color: '#94a3b8' }}>
          ¿No tienes cuenta? <Link href="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Regístrate aquí</Link>
        </div>
      </form>
    </AuthLayout>
  );
}
