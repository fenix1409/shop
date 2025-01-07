'use client';
import { instance } from '@/hook/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';

interface CategoryModalType {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: { id: string; categoryName: string }) => void;
  category?: { id: string; categoryName: string } | null;
}

const CategoryModal: React.FC<CategoryModalType> = ({ isOpen, onClose, onSave, category }) => {
  const [categoryName, setCategoryName] = useState<string>('');
  const queryClient = useQueryClient();

  useEffect(() => {
    if (category) {
      setCategoryName(category.categoryName);
    } else {
      setCategoryName('');
    }
  }, [category]);

  const mutation = useMutation({
    mutationFn: (data: any) => {
      if (category && category.id) {
        return instance().put(`/categories/${category.id}`, data);
      } else {
        return instance().post('/categories', data);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      onSave(data.data);
      setCategoryName('');
      onClose();
    },
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { categoryName };
    mutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl mb-4">{category ? 'Редактировать Категорию' : 'Создать Категорию +'}</h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Название Категории</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Введите название категории"
              className="border p-2 rounded mb-4 w-full"
              required
            />
          </div>
          <div className="flex justify-end">
            <button onClick={onClose} className="mr-2 bg-[#FF8F91] text-black px-4 py-2 rounded">Отмена</button>
            <button type="submit" className="bg-[#97FF8F] text-black px-4 py-2 rounded">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;