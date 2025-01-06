'use client';
import { configureStore } from "@reduxjs/toolkit";
import { orderSlice } from "./basketSlice";

export const store = configureStore({
    reducer: orderSlice.reducer
})