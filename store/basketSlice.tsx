'use client';
import { ProductType } from "@/service/Products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
    orderList: ProductType[]
}

const initialState: InitialStateType = {
    orderList: []
}

export const orderSlice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {
        saveOrderProducts: (state: InitialStateType, action: PayloadAction<ProductType>) => {
            const id = state.orderList.findIndex((item: ProductType) => item.id === action.payload.id)
            if (id === -1) {
                return {
                    orderList: [...state.orderList, action.payload]
                }
            }
            else {
                state.orderList.splice(id, 1, action.payload)
            }
        },
        deleteOrderProducts: (state: InitialStateType, action: PayloadAction<string>) => {
            const id = state.orderList.findIndex((item: ProductType) => item.id === action.payload)
            state.orderList.splice(id, 1)
        },
        clearOrders: () => {
            return {
                orderList: []
            }
        }
    }
})

export const { saveOrderProducts, deleteOrderProducts, clearOrders } = orderSlice.actions