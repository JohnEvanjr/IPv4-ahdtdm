// src/components/Navbar.tsx
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-green-900 p-4 text-2xl text-white">
      <ul className="flex space-x-10 font-bold">
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/ip">IPv4</Link>
        </li>
      </ul>
    </nav>
  );
}
