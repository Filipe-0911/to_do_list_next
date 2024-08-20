"use client";
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import BtnGreen from './BtnGreen';
import BtnRed from './BtnRed';

export default function NavBar({ }): JSX.Element {
  const { data: session } = useSession();
  return (
    <header className='flex justify-around content-center bg-slate-800 p-2 items-center fixed w-full top-0 z-50'>
      <span>
        {session?.user?.email}
      </span>
      <nav className='flex items-center'>
        <ul className='flex list-none gap-6'>
          <li><a href="/">Home</a></li>
          <li><a href="/tasks">Tasks</a></li>
        </ul>
      </nav>
      <div className='flex items-center gap-6'>
        {
          session
            ?
            <BtnRed onClick={signOut}>
              Logout
            </BtnRed>
            :
            <BtnGreen onClick={signIn}>
              Login
            </BtnGreen>
        }
      </div>
    </header>
  )
}