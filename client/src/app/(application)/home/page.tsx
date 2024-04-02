'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/`);
    },
  });
  const user = session?.user;
  return (
    <section className='flex flex-row gap-5 mt-4'>
      <div>Hello {user ? JSON.stringify(user) : null}</div>
    </section>
  );
}
