'use client';
import React, { useState } from 'react';
import { ProductType } from '@/service/Products';
import { instance } from '@/hook/instance';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { deleteOrderProducts } from '@/store/basketSlice';
import AddProductModal from './AddModal';

const CustomTable: React.FC = () => {
    const dispatch = useDispatch()
    const [isModal, setIsModal] = useState<boolean>(false)
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null)

    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: () => instance().get('/products').then((res) => res.data)
    })

    // delete part 
    const handleDeleteProduct = async (id: string) => {
        try {
            await instance().delete(`/products/${id}`)
            refetch()
            dispatch(deleteOrderProducts(id))
        } catch (error) {
            alert("Xato bor")
        }
    }

    // edit part
    const handleEditProduct = (product: ProductType) => {
        setSelectedProduct(product)
        setIsModal(true)
    }

    const handleSaveProduct = (product: ProductType) => {
        refetch()
        setIsModal(false)
        setSelectedProduct(null)
        console.log(product);
    }
    

    return (
        <div className="w-[926px] overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border border-gray-300 bg-blue-100 text-left">№</th>
                        <th className="px-4 py-2 border border-gray-300 bg-blue-100 text-left">Наименование</th>
                        <th className="px-4 py-2 border border-gray-300 bg-blue-100 text-left">Категория</th>
                        <th className="px-4 py-2 border border-gray-300 bg-blue-100 text-center">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((item: ProductType, index: number) => (
                            <tr key={item.id} className="text-sm">
                                <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                                <td className="px-4 py-2 border border-gray-300">{item.name}</td>
                                <td className="px-4 py-2 border border-gray-300">{item.categoryName}</td>
                                <td className="px-4 py-2 border border-gray-300 text-center">
                                    <button onClick={() => handleEditProduct(item)} className="mx-1 text-blue-500 hover:text-blue-700">✏️</button>
                                    <button onClick={() => handleDeleteProduct(item.id)} className="mx-1 text-red-500 hover:text-red-700">🗑️</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center py-4">No products found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <AddProductModal
                isOpen={isModal}
                onClose={() => setIsModal(false)}
                onSave={handleSaveProduct}
                product={selectedProduct}
            />
        </div>
    );
};

export default CustomTable;