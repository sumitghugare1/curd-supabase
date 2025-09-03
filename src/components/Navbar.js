import Link from 'next/link';

export default function Navbar() {
  const navStyles = {
    background: '#222',
    padding: '1rem',
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  };

  const linkStyles = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  return (
    <nav style={navStyles}>
      <Link href="/" style={linkStyles}>Home</Link>
      <span style={{ color: '#555' }}>|</span>
      <Link href="/event" style={linkStyles}>Event Page</Link>
      <Link href="/product" style={linkStyles}>Product Page</Link>
      <span style={{ color: '#555' }}>|</span>
      <strong>Admin:</strong>
      <Link href="/admin/events" style={linkStyles}>Events</Link>
      <Link href="/admin/products" style={linkStyles}>Products</Link>
      <Link href="/admin/faqs" style={linkStyles}>FAQs</Link>
      <Link href="/admin/settings" style={linkStyles}>Settings</Link>
    </nav>
  );
}