import TopNav from '@/components/TopNav';
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopNav />
      
      <section style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 5%',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background glow effects */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(15,23,42,0) 70%)',
          zIndex: -1,
          borderRadius: '50%'
        }}></div>

        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: '700', 
          lineHeight: '1.1',
          marginBottom: '1.5rem',
          background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Acceso inteligente a tu<br/>fraccionamiento
        </h1>
        
        <p style={{
          fontSize: '1.25rem',
          color: '#cbd5e1',
          maxWidth: '600px',
          marginBottom: '3rem',
          lineHeight: '1.6'
        }}>
          Genera códigos QR dinámicos para ti o tus invitados. Abre la pluma 
          automáticamente sin contacto, de forma segura y al instante.
        </p>
        
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/register" style={{ textDecoration: 'none' }}>
            <button className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
              Registrarse ahora
            </button>
          </Link>
          <Link href="/login" style={{ textDecoration: 'none' }}>
            <button className="btn glass" style={{ fontSize: '1.125rem', padding: '1rem 2rem', color: 'white' }}>
              Ya soy residente
            </button>
          </Link>
        </div>
      </section>

      {/* Feature section */}
      <section style={{ padding: '5rem 5%', background: 'rgba(30, 41, 59, 0.3)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <FeatureCard 
            title="Acceso Seguro" 
            desc="Tus códigos QR son únicos y renovables, asegurando que solo personal autorizado ingrese." 
          />
          <FeatureCard 
            title="Integración IoT" 
            desc="Conexión en tiempo real con Arduino/ESP32 para apertura automatizada en la caseta." 
          />
          <FeatureCard 
            title="Gestión de Invitados" 
            desc="Próximamente: Crea pases temporales para tus visitas fácilmente desde la aplicación." 
          />
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="glass" style={{ padding: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'white' }}>{title}</h3>
      <p style={{ color: '#94a3b8', lineHeight: '1.5' }}>{desc}</p>
    </div>
  );
}
