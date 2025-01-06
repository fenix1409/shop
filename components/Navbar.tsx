'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {
  const pathname = usePathname()

  const activeLinks = (path: string) => `text-[20px] leading-[18px] font-medium ${pathname === path ? 'text-blue-500' : ''}`

  return (
    <div className='w-[20%] h-[92vh] pt-[26px] pl-[10px] space-y-[15px] flex flex-col border-r-[1.5px] border-[#6B6B6B]'>
      <Link className={activeLinks('/')} href='/'>Главная</Link>
      <Link className={activeLinks('/category')} href='/category'>Котегории</Link>
      <Link className={activeLinks('/product')} href='/product'>Товар</Link>
      <Link className={activeLinks('/basket')} href='/basket'>Корзина</Link>
    </div>
  );
};

export default Navbar;
