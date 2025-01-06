'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ProductType } from '@/service/Products';
import Image from 'next/image';
import { deleteOrderProducts } from '@/store/basketSlice';

const Basket = () => {
    const savedProducts = useSelector((state: RootState) => state.order.orderList)
    const dispatch = useDispatch()

    return (
        <div className="p-16">
            <div className="flex items-center gap-[300px] mb-[45px]">
                <h1 className="text-2xl">Saved Products</h1>
                <p className='text-[18px] leading-[25px] font-medium'>Корзина ({savedProducts.length})</p>
            </div>
            {savedProducts.length === 0 ? (
                <p>No products in the basket.</p>
            ) : (
                <ul className='flex items-center gap-[41px]'>
                    {savedProducts.map((product: ProductType) => (
                        <li key={product.id} className="w-[168px] p-[10px] border-[1px] border-black">
                            <Image className="border-[1px] border-black object-contain mx-auto" src={product.img} alt="product image" width={121} height={76} priority style={{ width: '121px', height: '76px' }} />
                            <h2 className="text-[12px] leading-[18px] font-medium mt-[14px] mb-[9px]">{product.name}</h2>
                            <p className="text-[12px] leading-[18px] font-medium pb-[49px] border-b-[1px]">{product.description}</p>
                            <button onClick={() => dispatch(deleteOrderProducts(product.id))} className="text-[12px] leading-[18px] font-medium mt-[7px]">Удалить с корзины </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Basket;
