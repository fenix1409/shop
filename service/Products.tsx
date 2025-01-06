'use client';
import ProductCard from '@/components/ProductCard'
import { Context } from '@/context/Context'
import { instance } from '@/hook/instance'
import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export interface ProductType {
    id: string,
    categoryId: string,
    img: string,
    name: string,
    description: string
}

const Products = () => {
    const { categoryId } = useContext(Context)
    const orderList = useSelector((state: { orderList: ProductType[] }) => state.orderList)

    const { data: products = [] } = useQuery({
        queryKey: ['products', categoryId],
        queryFn: () => instance().get(`/products`, { params: { categoryId: categoryId != "1" ? categoryId : null } }).then((res => res.data)),
        enabled: true
    })
    const [getAllProducts, setGetAllProducts] = useState<ProductType[]>(products)
    useEffect(() => setGetAllProducts(products), [products])

    return (
        <div className='p-16 flex items-center flex-wrap gap-[30px]'>
            {getAllProducts.map((item:ProductType) => <ProductCard getAllProducts={getAllProducts} setGetAllProducts={setGetAllProducts} key={item.id} item={item}/>)}
        </div>
    )
}

export default Products