'use client';
import { instance } from '@/hook/instance';
import { CategoryType } from '@/service/Category';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { ChangeEvent, useState, useEffect } from 'react';

interface AddProductModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (product: { id: string, categoryName: string, img: string, name: string, description: string }) => void
    product?: { id: string, categoryName: string, img: string, name: string, description: string } | null
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSave, product }) => {
    const [id, setId] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [img, setImg] = useState<string>('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const queryClient = useQueryClient()

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: () => instance().get('/categories').then((res) => res.data)
    })

    // add and save values part 
    useEffect(() => {
        if (product) {
            setId(product.id)
            setCategoryName(product.categoryName)
            setImg(product.img)
            setName(product.name)
            setDescription(product.description)
        } else {
            setId('')
            setCategoryName('')
            setImg('')
            setName('')
            setDescription('')
        }
    }, [product])
    // add and save values part 

    // img part 
    function handleChooseImg(e: ChangeEvent) {
        const res = (e.target as HTMLInputElement).files
        if (res) {
            setImg(URL.createObjectURL(res[0]))
        }
    }
    // img part 

    // add and edit part 
    const mutation = useMutation({
        mutationFn: (data: any) => {
            if (product && product.id) {
                return instance().put(`/products/${product.id}`, data)
            } else {
                return instance().post('/products', data)
            }
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            onSave(data.data)
            setId('')
            setCategoryName('')
            setImg('')
            setName('')
            setDescription('')
            onClose()
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const data = { id, categoryName, img, name, description }
        mutation.mutate(data)
    }
    if (!isOpen) return null
    // add and edit part 


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl mb-4">{product ? 'Редактировать Товар' : 'Создать товар +'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">ID</label>
                        <input type="text" value={id} onChange={(e) => setId(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Категория</label>
                        <select value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                            <option value="">Выберите категорию</option>
                            {categories.map((item: CategoryType) => (
                                <option key={item.id} value={item.categoryName}>{item.categoryName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Изображение</label>
                        <input type="file" onChange={handleChooseImg} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        {img && <Image src={img} alt="Selected" className="mt-2 w-[200px] h-[82px] object-contain" width={200} height={82} priority style={{ width: "200px", height: "82px" }} />}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Название</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Описание</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-2 bg-[#FF8F91] text-black px-4 py-2 rounded">Отмена</button>
                        <button type="submit" className="bg-[#97FF8F] text-black px-4 py-2 rounded">Сохранить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;