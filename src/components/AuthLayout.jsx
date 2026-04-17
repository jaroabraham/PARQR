import Link from 'next/link';
import { QrCode, ArrowLeft } from 'lucide-react';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(15,23,42,0) 70%)',
        zIndex: -1,
        borderRadius: '50%'
      }}></div>

      <div className="glass" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem', position: 'relative' }}>
        <Link href="/" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', color: '#94a3b8', textDecoration: 'none' }}>
          <ArrowLeft size={20} />
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--primary)', padding: '0.75rem', borderRadius: '12px', marginBottom: '1rem' }}>
            <QrCode size={32} color="white" />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'white' }}>{title}</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.5rem' }}>{subtitle}</p>
        </div>
        
        {children}
      </div>
    </div>
  );
}
