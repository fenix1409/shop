'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryType {
    id: string;
    categoryName: string;
}

interface InitialStateType {
    categoryList: CategoryType[];
}

const initialState: InitialStateType = {
    categoryList: []
};

export const categorySlice = createSlice({
    name: "categorySlice",
    initialState,
    reducers: {
        addCategory: (state: InitialStateType, action: PayloadAction<CategoryType>) => {
            state.categoryList.push(action.payload);
        },
        deleteCategory: (state: InitialStateType, action: PayloadAction<string>) => {
            state.categoryList = state.categoryList.filter(category => category.id !== action.payload);
        },
        updateCategory: (state: InitialStateType, action: PayloadAction<CategoryType>) => {
            const index = state.categoryList.findIndex(category => category.id === action.payload.id);
            if (index !== -1) {
                state.categoryList[index] = action.payload;
            }
        },
        clearCategories: () => {
            return {
                categoryList: []
            };
        }
    }
});

export const { addCategory, deleteCategory, updateCategory, clearCategories } = categorySlice.actions;
export default categorySlice.reducer;