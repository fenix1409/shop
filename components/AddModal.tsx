'use client';
import { instance } from '@/hook/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { ChangeEvent, useState } from 'react';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: { id: string; categoryId: string; img: string; name: string; description: string }) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSave }) => {
    const [id, setId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [img, setImg] = useState<string>("")
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const queryClient = useQueryClient()

    function handleChooseImg(e: ChangeEvent) {
        const res = (e.target as HTMLInputElement).files
        if (res) {
            setImg(URL.createObjectURL(res[0]))
        }
    }

    const mutation = useMutation({
        mutationFn: (data: any) => instance().post('/products', data),
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey:['products']})
        }
    })

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { id, categoryId, img, name, description }
    onClose();
    mutation.mutate(data)
};

if (!isOpen) return null;

return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl mb-4">Создать  товар   +</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">ID</label>
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Категория</label>
                    <input type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Наименование  товара</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Описание</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Фото</label>
                    <input type="file" onChange={handleChooseImg} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
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