// src/app/ip/page.tsx
import Link from 'next/link';
import IPv4 from '../../components/IPv4';
import Nav from '../../components/Nav'

export default function IpPage() {
  return (
    <div>
      <Nav />
      <IPv4 />
    </div>
  );
}