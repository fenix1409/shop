"use client"
import AddProductModal from '@/components/AddModal';
import CustomTable from '@/components/CustomTable';
import { ProductType } from '@/service/Products';
import { saveOrderProducts } from '@/store/basketSlice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const Product = () => {
    const [isModal, setIsModal] = useState<boolean>(false)
    const dispatch = useDispatch()

    // add part 
    const handleAddProduct = (product: ProductType) => {
        dispatch(saveOrderProducts(product))
        console.log(product);
        
    }
    return (
        <div className='pt-[142px] pl-[24px]'>
            <button onClick={() => setIsModal(true)} className="mb-4 bg-[#6BE1FF] text-black px-4 py-2 rounded">Создать  товар   +</button>
            <CustomTable />
            <AddProductModal
                isOpen={isModal}
                onClose={() => setIsModal(false)}
                onSave={handleAddProduct}
            />
        </div>
    )
}

export default Product