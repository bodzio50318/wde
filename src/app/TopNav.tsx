import Link from 'next/link';

export default function TopNav() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
        <li style={{ marginRight: '1rem' }}>
          <Link href="/">Home</Link>
        </li>
        <li style={{ marginRight: '1rem' }}>
          <Link href="/list">Lists</Link>
        </li>
        <li style={{ marginRight: '1rem' }}>
          <Link href="/item">Item managment</Link>
        </li>
      </ul>
    </nav>
  );
}