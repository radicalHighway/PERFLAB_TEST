//Тип состояния задачи

import { createSlice } from "@reduxjs/toolkit"
import type { ArrayProductsType, IProduct } from "../model/types"
import { createProduct, deleteProductById, updateProductById, getProductById, getProducts } from "../api/productThunkApi"

type ProductState = {
  products: ArrayProductsType;
  product: IProduct | null;
  isLoading: boolean;
  error: string | null;
}

// Начальное состояние  

const initialState: ProductState = {
  products: [],
  product: null,
  isLoading: false,
  error: null,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers:{},
  extraReducers: (builder)=>{
    builder
    .addCase(getProducts.pending, (state)=>{
      state.isLoading = true;
    })
    .addCase(getProducts.fulfilled,(state, action)=>{
      state.isLoading =false;
      state.products = action.payload.data;
      state.error = null;
    })
    .addCase(getProducts.rejected, (state, action)=>{
      state.isLoading = false;
      state.error = action.payload?.message || 'Ошибка при получении всех задач';
    })
    .addCase(getProductById.pending, (state)=>{
      state.isLoading = true;
    })
    .addCase(getProductById.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.product = action.payload.data;
      state.error = null;
    })
    .addCase(getProductById.rejected, (state, action)=>{
      state.isLoading = false;
      state.error = action.payload?.message || 'Ошибка при получении задачи по id';
    })
    .addCase(createProduct.pending, (state)=>{
      state.isLoading = true;
    })
    .addCase(createProduct.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.products.push(action.payload.data);
      state.error = null;
    })
    .addCase(createProduct.rejected, (state, action)=>{
      state.isLoading = false;
      state.error = action.payload?.message || 'Ошибка при создании задачи';
    })
    .addCase(deleteProductById.pending, (state)=>{
      state.isLoading = true;
    })
    .addCase(deleteProductById.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.products = state.products.filter(product => product.id !== action.payload.data.id);
    })
    .addCase(deleteProductById.rejected, (state, action)=>{
      state.isLoading = false;
      state.error = action.payload?.message || 'Ошибка при удалении задачи';
    })
    .addCase(updateProductById.pending, (state)=>{
      state.isLoading = true;
    })
    .addCase(updateProductById.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.products = state.products.map(product => product.id === action.payload.data.id ? action.payload.data : product);
      state.error  =null
      })
      .addCase(updateProductById.rejected, (state, action)=>{
        state.isLoading = false;
        state.error = action.payload?.message || 'Ошибка при обновлении задачи';
      })
  }
})
export const productReducer = productSlice.reducer;


