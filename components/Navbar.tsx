'use client';
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-[20%] h-[92vh] pt-[26px] pl-[10px] space-y-[15px] flex flex-col border-r-[1.5px] border-[#6B6B6B]'>
        <Link className='text-[20px] leading-[18px] font-medium' href={'/'}>Главная</Link>
        <Link className='text-[20px] leading-[18px] font-medium' href={'/category'}>Котегории</Link>
        <Link className='text-[20px] leading-[18px] font-medium' href={'/product'}>Товар</Link>
        <Link className='text-[20px] leading-[18px] font-medium' href={'/basket'}>Корзина</Link>
    </div>
  )
}

export default Navbar