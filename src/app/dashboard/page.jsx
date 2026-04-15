"use client";
import DashboardLayout from '@/components/DashboardLayout';
import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const [qrToken, setQrToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          setUser(data.user);
          setQrToken(data.user.qrToken);
        }
      })
      .catch(console.error);
  }, []);

  const getQrUrl = () => {
    if (typeof window === 'undefined') return qrToken;
    const savedIp = localStorage.getItem('parqr_server_ip');
    const base = savedIp ? `http://${savedIp}:3000` : window.location.origin;
    return `${base}/scanner?token=${qrToken}`;
  };
  
  // El código ahora es estático y viene de la base de datos
  // En el futuro se podría implementar rotación sincronizada

  return (
    <DashboardLayout>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
          Hola, {user ? user.name : 'Cargando...'}
        </h1>
        <p style={{ color: '#94a3b8' }}>
          {user ? `Residente Activo (${user.email})` : 'Obteniendo datos...'}
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        
        {/* QR Card */}
        <div className="glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>Tu Código de Acceso</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '2rem' }}>
            Acerca este código al escáner de la caseta para abrir la pluma.
          </p>

          <div style={{ 
            background: 'white', 
            padding: '1.5rem', 
            borderRadius: '16px', 
            marginBottom: '1.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
          }}>
            {qrToken !== 'generando...' && (
              <QRCodeSVG 
                value={getQrUrl()}
                size={220}
                bgColor={"#ffffff"}
                fgColor={"#0f172a"}
                level={"H"}
                includeMargin={false}
              />
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.875rem', fontWeight: '500' }}>
            <CheckCircle2 size={16} />
            <span>Código de acceso oficial</span>
          </div>
        </div>

        {/* Status and Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 color="var(--success)" size={20} />
              Estado del Servicio
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#94a3b8' }}>Sistema de Caseta</span>
                <span style={{ color: 'var(--success)' }}>En línea</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#94a3b8' }}>Último acceso tuyo</span>
                <span style={{ color: 'white' }}>Hoy, 08:30 AM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Cuota Mantenimiento</span>
                <span style={{ color: 'var(--success)' }}>Al corriente</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
