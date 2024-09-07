// src/app/about/page.tsx
import Link from 'next/link';
import About from '../../components/About';
import Nav from '../../components/Nav'

export default function AboutPage() {
  return (
    <div>
      <Nav />
      <About />
    </div>
  );
}