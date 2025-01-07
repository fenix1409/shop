"use client"
import React, { useState } from 'react'
import CategoryModal from './CategoryModal'
import { useQuery } from '@tanstack/react-query'
import { instance } from '@/hook/instance'

interface CategoryType {
    id: string,
    title: string,
    categoryName: string,
    categoryImg: string
}

const CategoryTable = () => {
    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: () => instance().get('/categories').then((res) => res.data)
    })

    // add part 
    function addCategory(){

    }
    return (
        <div>
            <table className="w-[926px] border-collapse border border-gray-300">
                <thead className="bg-blue-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">№</th>
                        <th className="border border-gray-300 px-4 py-2">Наименование</th>
                        <th className="border border-gray-300 px-4 py-2">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category: CategoryType, index: number) => (
                        <tr key={category.id}>
                            <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{category.title}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button className="text-blue-500 mr-2">✏️</button>
                                <button className="text-red-500">🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CategoryTable