"use client"
import CategoryModal from "@/components/CategoryModal";
import CategoryTable from "@/components/CategoryTable";
import { useState } from "react";

const Category = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    function addCategory(){

    }

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Созданные Категории</h2>
            <button onClick={() => setIsModalOpen(true)} className="mb-4 bg-[#6BE1FF] text-black py-2 px-4 rounded">Создать категорию +</button>
            <CategoryTable/>
            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={addCategory}
            />
        </div>
    );
};

export default Category