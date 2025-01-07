'use client';
import CategoryTable from '@/components/CategoryTable';
import ProductCard from '@/components/ProductCard';
import { instance } from '@/hook/instance';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';

export interface CategoryType {
    id: string
    categoryName: string
}

const Cateory = () => {
    const { data: categories = [] } = useQuery({
        queryKey: ['category'],
        queryFn: () => instance().get('/categories').then((res) => res.data)
    })

    const [getAllCategories, setGetAllCategories] = useState<CategoryType[]>(categories)

    useEffect(() => {
        setGetAllCategories(categories)
    }, [categories])

    return (
        <ul className="flex items-center gap-[41px] flex-wrap">
            <CategoryTable/>
        </ul>
    );
};

export default Cateory;
