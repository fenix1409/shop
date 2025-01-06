'use client';

import { ProductType } from '@/service/Products';
import { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';

const CustomTable: React.FC = () => {
    const orderedProducts = useSelector((state: RootState) => state.all.orderList)

    console.log(orderedProducts);

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
                    {/* {orderedProducts.map((item, index) => (
                        <tr key={item.id} className="text-sm">
                            <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                            <td className="px-4 py-2 border border-gray-300">{item.name}</td>
                            <td className="px-4 py-2 border border-gray-300">{item.categoryId}</td>
                            <td className="px-4 py-2 border border-gray-300 text-center">
                                <button className="mx-1 text-blue-500 hover:text-blue-700">✏️</button>
                                <button className="mx-1 text-red-500 hover:text-red-700">🗑️</button>
                            </td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
        </div>
    );
};

export default CustomTable;