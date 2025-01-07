"use client"
import { useState } from "react";

interface CategoryModalType {
  isOpen: boolean
  onClose: () => void
  onSave: (categoryName: string) => void
};

const CategoryModal: React.FC<CategoryModalType> = ({ isOpen, onClose, onSave }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSave = () => {
    if (categoryName.trim() === "") {
      alert("Наименование категории не может быть пустым!");
      return;
    }
    onSave(categoryName);
    setCategoryName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Создать Категорию</h2>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Наименование категории <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Введите название категории"
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Сохранить
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
