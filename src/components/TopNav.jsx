import Link from 'next/link';
import { QrCode, LogIn } from 'lucide-react';

export default function TopNav() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem 5%',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--card-border)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 'bold', fontSize: '1.5rem', color: 'white' }}>
        <QrCode size={32} color="var(--primary)" />
        <span>PARQR</span>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/login" style={{ textDecoration: 'none' }}>
          <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <LogIn size={20} />
            Ingresar
          </button>
        </Link>
      </div>
    </nav>
  );
}
