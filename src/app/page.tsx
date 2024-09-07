// src/app/page.tsx
import Link from 'next/link';
import IPv4 from '../components/IPv4';
import Nav from '../components/Nav'
import About from '@/components/About';
export default function Home() {
  return (
    <>
      <Nav />
      <About />
    </>
  );
}
