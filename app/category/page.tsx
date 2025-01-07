"use client"
import CategoryModal from "@/components/CategoryModal";
import CategoryTable from "@/components/CategoryTable";
import { useState } from "react";

const Category = () => {
    const [newCategoryName, setNewCategoryName] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    function addCategory(){

    }

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Созданные Категории</h2>
            <button onClick={() => setIsModalOpen(true)} className="mb-4 bg-blue-500 text-white py-2 px-4 rounded">Создать категорию +</button>
            <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Введите название категории" className="border p-2 rounded mb-4 ml-2" />
            <CategoryTable/>
            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={addCategory}
            />
        </div>
    );
};

export default Category;
