import './globals.css';

export const metadata = {
  title: 'PARQR - Acceso Inteligente',
  description: 'Sistema de control de acceso por código QR para fraccionamientos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
