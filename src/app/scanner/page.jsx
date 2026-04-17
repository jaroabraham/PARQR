"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { QrCode, Shield, Check, X, ArrowRight, Loader2 } from 'lucide-react';

function ScannerContent() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [result, setResult] = useState(null);
  const [isPlumaOpen, setIsPlumaOpen] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
      // We need to wait a bit to ensure the component is fully ready or just call validate
      setTimeout(() => validateToken(tokenParam), 500);
    }
  }, [searchParams]);

  const validateToken = async (tokenToValidate) => {
    setIsValidating(true);
    setResult(null);
    
    try {
      const res = await fetch('/api/qr/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrToken: tokenToValidate })
      });
      const data = await res.json();
      
      setResult({
        success: data.success,
        message: data.message,
        name: data.resident || data.guestName || 'Desconocido'
      });

      if (data.success) {
        setIsPlumaOpen(true);
        setTimeout(() => setIsPlumaOpen(false), 5000);
      }
    } catch (error) {
      setResult({ success: false, message: 'Error de conexión' });
    }
    setIsValidating(false);
  };

  const handleValidate = async (e) => {
    if (e) e.preventDefault();
    validateToken(token);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Shield size={40} color="#3b82f6" />
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Simulador de Caseta</h1>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>Punto de Validación de Acceso</p>
      </header>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', width: '100%', maxWidth: '1200px' }}>
        
        {/* Scanner Terminal */}
        <div style={{ 
          background: '#1e293b', padding: '2.5rem', borderRadius: '24px', 
          width: '100%', maxWidth: '450px', border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column'
        }}>
          <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '16px', marginBottom: '2rem', border: '2px solid #334155', textAlign: 'center' }}>
            <QrCode size={80} color={isValidating ? '#3b82f6' : '#64748b'} strokeWidth={1.5} className={isValidating ? "pulse" : ""} />
            <p style={{ marginTop: '1.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>Acerque su código QR al escáner</p>
          </div>

          <form onSubmit={handleValidate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Ingrese token manualmente..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid #334155', color: 'white', fontSize: '1rem' }}
            />
            <button 
              disabled={isValidating || !token}
              style={{ 
                padding: '1rem', borderRadius: '12px', background: '#3b82f6', color: 'white', 
                border: 'none', fontWeight: '600', fontSize: '1.1rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                opacity: isValidating || !token ? 0.7 : 1, transition: 'all 0.2s'
              }}
            >
              {isValidating ? <Loader2 className="spin" size={20} /> : <ArrowRight size={20} />}
              Validar Acceso
            </button>
          </form>

          {result && (
            <div style={{ 
              marginTop: '2rem', padding: '1.5rem', borderRadius: '16px',
              background: result.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${result.success ? '#10b981' : '#ef4444'}`,
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {result.success ? <Check color="#10b981" /> : <X color="#ef4444" />}
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: result.success ? '#10b981' : '#ef4444' }}>
                  {result.success ? 'ACCESO PERMITIDO' : 'ACCESO DENEGADO'}
                </span>
              </div>
              <p style={{ color: 'white', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{result.message}</p>
              {result.success && <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Bienvenido, {result.name}</p>}
            </div>
          )}
        </div>

        {/* Physical Barrier Representation */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ marginBottom: '2rem', color: '#94a3b8' }}>Representación Física</h2>
          <div style={{ position: 'relative', width: '400px', height: '300px', background: '#1e293b', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            
            {/* Base of the Pluma */}
            <div style={{ position: 'absolute', left: '40px', bottom: '40px', width: '60px', height: '120px', background: '#334155', borderRadius: '8px', zIndex: 12 }}>
              <div style={{ width: '40px', height: '10px', background: '#ef4444', margin: '15px auto' }} />
              <div style={{ width: '40px', height: '10px', background: '#10b981', margin: '15px auto', opacity: isPlumaOpen ? 1 : 0.3 }} />
            </div>

            {/* The Pluma (Barrier Arm) */}
            <div style={{ 
              position: 'absolute', left: '70px', bottom: '135px', 
              width: '280px', height: '15px', 
              background: 'repeating-linear-gradient(90deg, #f8fafc, #f8fafc 40px, #ef4444 40px, #ef4444 80px)',
              borderRadius: '8px', border: '2px solid #334155',
              transformOrigin: '0% 50%',
              transform: isPlumaOpen ? 'rotate(-90deg)' : 'rotate(0deg)',
              transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: 11
            }} />

            {/* Road/Ground */}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '40px', background: '#0f172a' }} />
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: isPlumaOpen ? '#10b981' : '#ef4444' }} />
              <span>{isPlumaOpen ? 'Pluma Abierta' : 'Pluma Cerrada'}</span>
            </div>
            <div style={{ color: '#64748b', fontSize: '0.875rem' }}>IP ESP32: 192.168.1.105 (Ejemplo)</div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        .pulse {
          animation: pulse 1.5s infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>

    </div>
  );
}

export default function ScannerSimulator() {
  return (
    <Suspense fallback={<div>Cargando escáner...</div>}>
      <ScannerContent />
    </Suspense>
  );
}
