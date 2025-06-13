// src/entities/user/api/userThunkApi.ts
import { PRODUCTS_THUNKS_TYPES } from '@/shared/enums/productThunkTypes';
import { PRODUCTS_API_ROUTES } from '@/shared/enums/productApiRoutes';
import { axiosInstance } from '@/shared/lib/axiosInstance';
import type { IApiResponseReject, IApiResponseSuccess } from '@/shared/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { ArrayProductsType, IProduct, IRawProductData } from '../model/types';

// Получение всех продуктов
export const getProducts = createAsyncThunk<
  IApiResponseSuccess<ArrayProductsType>,
  void,
  { rejectValue: IApiResponseReject }
>(PRODUCTS_THUNKS_TYPES.GET_PRODUCTS, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<
      IApiResponseSuccess<ArrayProductsType>
    >(PRODUCTS_API_ROUTES.PRODUCTS);
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

// Получение задачи по id
export const getProductById = createAsyncThunk<
  IApiResponseSuccess<IProduct>,
  number,
  { rejectValue: IApiResponseReject }
>(PRODUCTS_THUNKS_TYPES.GET_PRODUCT_BY_ID, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<IApiResponseSuccess<IProduct>>(
      `${PRODUCTS_API_ROUTES.PRODUCTS}/${id}`
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

// Создание продукта
export const createProduct = createAsyncThunk<
  IApiResponseSuccess<IProduct>,
  IRawProductData,
  { rejectValue: IApiResponseReject }
>(PRODUCTS_THUNKS_TYPES.CREATE_PRODUCT, async (newProduct, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<IApiResponseSuccess<ITask>>(
      `${PRODUCTS_API_ROUTES.PRODUCTS}`,
      newProduct
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

// удаление продукта
export const deleteProductById = createAsyncThunk<
  IApiResponseSuccess<IProduct>,
  number,
  { rejectValue: IApiResponseReject }
>(PRODUCTS_THUNKS_TYPES.DELETE_PRODUCT_BY_ID, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete<IApiResponseSuccess<IProduct>>(
      `${PRODUCTS_API_ROUTES.PRODUCTS}/${id}`
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

// Обновление продукта
export const updateProductById = createAsyncThunk<
  IApiResponseSuccess<IProduct>,
  { id: number; productData: IRawProductData },
  { rejectValue: IApiResponseReject }
>(
  PRODUCTS_THUNKS_TYPES.UPDATE_PRODUCT_BY_ID,
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put<IApiResponseSuccess<ITask>>(
        `${PRODUCTS_API_ROUTES.PRODUCTS}/${id}`,
        productData
      );
      return data;
    } catch (error) {
      const err = error as AxiosError<IApiResponseReject>;
      return rejectWithValue(err.response!.data);
    }
  }
);
