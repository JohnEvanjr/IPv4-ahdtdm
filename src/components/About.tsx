// src/components/About.tsx
import Link from 'next/link';
import React from 'react';

export default function About() {
  return (
    <div className="text-red-700">
      <Link href="/ip">About</Link>
    </div>
  );
}