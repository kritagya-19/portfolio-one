'use client';

import React from 'react';
import InkReveal from '@/components/ui/ink-reveal';

export default function DemoOne() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '400px',
        overflow: 'hidden',
        borderRadius: '12px',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
        alt="Scenic Mountain Landscape"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      <InkReveal maskColor={[252, 250, 248]} />
    </div>
  );
}
