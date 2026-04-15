"use client";
import DashboardLayout from '@/components/DashboardLayout';
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { UserPlus, Clock, Search, Trash2, Calendar, Share2 } from 'lucide-react';

export default function InvitadosPage() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ guestName: '', validHours: 24 });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/guests');
      const data = await res.json();
      if (data.success) setGuests(data.guests);
    } catch (error) {
      console.error('Error fetching guests:', error);
    }
    setLoading(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch('/api/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setGuests([data.guest, ...guests]);
        setShowForm(false);
        setFormData({ guestName: '', validHours: 24 });
      }
    } catch (error) {
      alert('Error creando invitado');
    }
    setCreating(false);
  };

  const getQrUrl = (token) => {
    if (typeof window === 'undefined') return token;
    const savedIp = localStorage.getItem('parqr_server_ip');
    const base = savedIp ? `http://${savedIp}:3000` : window.location.origin;
    return `${base}/scanner?token=${token}`;
  };

  return (
    <DashboardLayout>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>Mis Invitados</h1>
          <p style={{ color: '#94a3b8' }}>Gestiona los accesos temporales para tus visitas.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
          style={{ 
            display: 'flex', alignItems: 'center', gap: '0.5rem', 
            padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer',
            border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '600'
          }}
        >
          <UserPlus size={20} />
          {showForm ? 'Cancelar' : 'Nuevo Invitado'}
        </button>
      </header>

      {showForm && (
        <div className="glass" style={{ padding: '2rem', marginBottom: '2rem', maxWidth: '500px' }}>
          <h2 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.25rem' }}>Generar Pase de Acceso</h2>
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Nombre del Invitado</label>
              <input 
                type="text" 
                required
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                placeholder="Ej. Juan Pérez"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', color: 'white' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Validez (Horas)</label>
              <select 
                value={formData.validHours}
                onChange={(e) => setFormData({ ...formData, validHours: parseInt(e.target.value) })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', color: 'white' }}
              >
                <option value={4}>4 horas</option>
                <option value={12}>12 horas</option>
                <option value={24}>24 horas (1 día)</option>
                <option value={48}>48 horas (2 días)</option>
                <option value={168}>1 semana</option>
              </select>
            </div>
            <button 
              type="submit" 
              disabled={creating}
              style={{ padding: '0.75rem', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '600', cursor: 'pointer', opacity: creating ? 0.7 : 1 }}
            >
              {creating ? 'Generando...' : 'Generar Código QR'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <p style={{ color: '#94a3b8', textAlign: 'center', padding: '3rem' }}>Cargando invitados...</p>
      ) : guests.length === 0 ? (
        <div className="glass" style={{ padding: '4rem', textAlign: 'center' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Search size={30} color="#94a3b8" />
          </div>
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>No hay invitados activos</h2>
          <p style={{ color: '#94a3b8' }}>Genera un código QR para que tus visitas puedan entrar sin esperas.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {guests.map(guest => (
            <div key={guest.id} className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ color: 'white', fontWeight: '600' }}>{guest.guestName}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={12} /> Creado: {new Date(guest.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {guest.isUsed ? (
                   <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', color: '#94a3b8' }}>Usado</span>
                ) : (
                   <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>Activo</span>
                )}
              </div>

              <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', alignSelf: 'center' }}>
                <QRCodeSVG 
                  value={getQrUrl(guest.qrToken)} 
                  size={140} 
                  level="H"
                  bgColor="#ffffff"
                  fgColor={guest.isUsed ? "#94a3b8" : "#0f172a"}
                />
              </div>

              <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={12} /> Expira:
                  </div>
                  <div style={{ color: 'white' }}>{new Date(guest.validUntil).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</div>
                </div>
                <button 
                  title="Compartir"
                  onClick={() => alert('Función de compartir próximamente')}
                  className="btn-icon"
                >
                  <Share2 size={16} color="var(--primary)" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          background: rgba(255,255,255,0.05);
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-icon:hover {
          background: rgba(255,255,255,0.1);
        }
      `}</style>
    </DashboardLayout>
  );
}
