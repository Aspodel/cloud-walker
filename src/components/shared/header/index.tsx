'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import Button from '@/components/shared/button';
import ModeToggle from '../button/mode-toggle';
import Link from 'next/link';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className='sticky top-0 z-10 flex items-center justify-between bg-background py-6 transition-colors'>
      <div className='flex items-center space-x-12'>
        <div className='flex items-center'>
          <Image
            className='dark:invert'
            src={logo}
            alt='Cloud Walker logo'
            width={40}
            height={40}
            priority
          />
          <h3 className='ml-2 font-bold'>Cloud Walker</h3>
        </div>
        <nav className='hidden space-x-12 font-medium lg:flex'>
          <Link href='/' className='hover:text-gray-400'>
            Home
          </Link>
          <Link href='/about' className='hover:text-gray-400'>
            About
          </Link>
          <Link href='/add' className='hover:text-gray-400'>
            Write
          </Link>
        </nav>
      </div>
      <div className='hidden items-center space-x-6 lg:flex'>
        <ModeToggle />
        <Button variant='outlined'>Sign up</Button>
        <Button>Sign in</Button>
      </div>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className='z-10 focus:outline-none lg:hidden'
      >
        <svg
          className='h-6 w-6 text-gray-800 dark:text-gray-200'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
          />
        </svg>
      </button>
      {menuOpen && (
        <div className='fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-background'>
          <nav className='flex flex-col items-center space-y-16 font-medium'>
            <Link href='/' className='hover:text-gray-400' onClick={closeMenu}>
              Home
            </Link>
            <Link
              href='/best-practices-for-successful-prototypes'
              className='hover:text-gray-400'
              onClick={closeMenu}
            >
              Article
            </Link>
            <Link
              href='/contact'
              className='hover:text-gray-400'
              onClick={closeMenu}
            >
              Contact
            </Link>
            <Link href='/' className='hover:text-gray-400' onClick={closeMenu}>
              Sign up
            </Link>
            <Link href='/' className='hover:text-gray-400' onClick={closeMenu}>
              Sign in
            </Link>
            <ModeToggle />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
