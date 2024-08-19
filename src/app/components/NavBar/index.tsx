"use client";
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import BtnLogin from './BtnLogin';
import BtnLogout from './BtnLogout';

export default function NavBar({ }): JSX.Element {
  const { data: session } = useSession();

  return (
    <header className='flex justify-around content-center bg-slate-800 p-2 items-center'>
      <span>
        {session?.user?.email}
      </span>
      <nav className='flex items-center'>
        <ul className='flex list-none gap-6'>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <div className='flex items-center gap-6'>
        <BtnLogin onClick={signIn} />
        <BtnLogout onClick={signOut} />
      </div>
    </header>
  )
}