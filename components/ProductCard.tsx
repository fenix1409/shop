'use client';
import { ProductType } from '@/service/Products';
import { saveOrderProducts } from '@/store/basketSlice';
import Image from 'next/image';
import React, { SetStateAction } from 'react';
import { useDispatch } from 'react-redux';

interface ProductCardType {
  item: ProductType
  getAllProducts: ProductType[]
  setGetAllProducts: React.Dispatch<SetStateAction<ProductType[]>>
}

const ProductCard: React.FC<ProductCardType> = ({ item }) => {
  const dispatch = useDispatch()

  const handleOrderBtnClick = () => {
    dispatch(saveOrderProducts(item))
  };

  return (
    <li className="w-[168px] p-[10px] border-[1px] border-black">
      <Image className="border-[1px] border-black object-contain mx-auto" src={item.img} alt="product image" width={121} height={76} priority style={{ width: '121px', height: '76px' }} />
      <h2 className="text-[12px] leading-[18px] font-medium mt-[14px] mb-[9px]">{item.name}</h2>
      <p className="text-[12px] leading-[18px] font-medium pb-[49px] border-b-[1px]">{item.description}</p>
      <button onClick={handleOrderBtnClick} className="text-[12px] leading-[18px] font-medium mt-[7px]">В корзину</button>
    </li>
  );
};

export default ProductCard;
