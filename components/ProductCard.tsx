'use client';
import { ProductType } from '@/service/Products'
import { saveOrderProducts } from '@/store/basketSlice'
import Image from 'next/image'
import React, { SetStateAction } from 'react'
import { useDispatch } from 'react-redux'

interface ProductCardType {
    item: ProductType,
    getAllProducts: ProductType[],
    setGetAllProducts: React.Dispatch<SetStateAction<ProductType[]>>
}
const ProductCard: React.FC<ProductCardType> = ({item, getAllProducts, setGetAllProducts}) => {
    const dispatch = useDispatch()
    
    function handleOrderBtnClick() {
        const data = {...item}
        setGetAllProducts(getAllProducts.map((value:ProductType) => value.id === item.id ? data : value))

        dispatch(saveOrderProducts({...data}))
    }
  return (
    <div className='w-[168px] p-[10px]'>
        <Image src={item.img} alt='product image' width={121} height={76} priority style={{width:"121px", height:"76px"}}/>
        <h2 className='text-[12px] leading-[18px] font-medium mt-[14px] mb-[9px]'>{item.name}</h2>
        <p className='text-[12px] leading-[18px] font-medium pb-[49px] border-b-[1px]'>{item.description}</p>
        <button onClick={handleOrderBtnClick} className='text-[12px] leading-[18px] font-medium mt-[7px]'>В корзину </button>
    </div>
  )
}

export default ProductCard