"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Settings, LogOut, QrCode, ShieldCheck } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          setUser(data.user);
        }
      })
      .catch(console.error);
  }, []);

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
      {/* Sidebar */}
      <aside className="glass" style={{ 
        width: '260px', 
        borderRight: '1px solid var(--card-border)', 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '1.5rem',
        borderRadius: '0',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 'bold', fontSize: '1.5rem', color: 'white', marginBottom: '3rem' }}>
          <QrCode size={32} color="var(--primary)" />
          <span>PARQR</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Mi Acceso QR" active={pathname === '/dashboard'} />
          <NavItem href="/dashboard/invitados" icon={<Users size={20} />} label="Mis Invitados" active={pathname === '/dashboard/invitados'} />
          
          {user?.role === 'ADMIN' && (
            <NavItem href="/dashboard/admin" icon={<ShieldCheck size={20} />} label="Panel Admin" active={pathname === '/dashboard/admin'} />
          )}

          <NavItem href="/dashboard/settings" icon={<Settings size={20} />} label="Configuración" active={pathname === '/dashboard/settings'} />
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--card-border)' }}>
          <button 
            onClick={handleLogout}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', 
              padding: '0.75rem 1rem', background: 'transparent', border: 'none', 
              color: '#ef4444', cursor: 'pointer', borderRadius: '8px',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}

function NavItem({ href, icon, label, active }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div style={{ 
        display: 'flex', alignItems: 'center', gap: '0.75rem', 
        padding: '0.75rem 1rem', 
        background: active ? 'var(--primary)' : 'transparent',
        color: active ? 'white' : '#cbd5e1',
        borderRadius: '8px',
        transition: 'all 0.2s'
      }}
      onMouseOver={(e) => !active && (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
      onMouseOut={(e) => !active && (e.currentTarget.style.background = 'transparent')}
      >
        {icon}
        <span style={{ fontWeight: active ? '600' : '500' }}>{label}</span>
      </div>
    </Link>
  );
}
