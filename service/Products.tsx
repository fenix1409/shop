'use client';
import ProductCard from '@/components/ProductCard';
import { instance } from '@/hook/instance';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';

export interface ProductType {
    id: string
    categoryId: string
    img: string
    name: string
    description: string
}

const Products = () => {
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: () => instance().get('/products').then((res) => res.data)
    })

    const [getAllProducts, setGetAllProducts] = useState<ProductType[]>(products)

    useEffect(() => {
        setGetAllProducts(products);
    }, [products]);

    return (
        <ul className="flex items-center gap-[41px] flex-wrap">
            {getAllProducts.map((item: ProductType) => (
                <ProductCard key={item.id} item={item} getAllProducts={getAllProducts} setGetAllProducts={setGetAllProducts} />
            ))}
        </ul>
    );
};

export default Products;
