'use client';
import React, { useState } from 'react';
import CategoryModal from './CategoryModal';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/hook/instance';
import { useDispatch } from 'react-redux';
import { deleteOrderProducts, deleteProduct } from '@/store/basketSlice';

interface CategoryType {
    id: string
    title: string
    categoryName: string
    categoryImg: string
}

const CategoryTable = () => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null)
    const dispatch = useDispatch()

    const { data: categories = [], refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: () => instance().get('/categories').then((res) => res.data)
    })

    const handleEditCategory = (category: CategoryType) => {
        setSelectedCategory(category)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        setSelectedCategory(null)
    }

    // delete part 
    const handleDeleteCategory = async (id: string) => {
        try {
            await instance().delete(`/categories/${id}`)
            refetch()
            dispatch(deleteOrderProducts(id))
        } catch (error) {
            alert("Xato bor")
        }
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
                            <td className="border border-gray-300 px-4 py-2">{category.categoryName}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button onClick={() => handleEditCategory(category)} className="mx-1 text-blue-500 hover:text-blue-700">✏️</button>
                                <button onClick={() => handleDeleteCategory(category.id)} className="mx-1 text-blue-500 hover:text-blue-700">🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {openModal && (
                <CategoryModal
                    isOpen={openModal}
                    onClose={handleCloseModal}
                    onSave={() => { }}
                    category={selectedCategory}
                />
            )}
        </div>
    );
};

export default CategoryTable;