// shared/hooks/useProductsFilter.ts
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/shared/hooks';
import { getProducts, getProductsByCategory } from '@/entities/product/api/productThunkApi';
import { CATEGORIES_MAP } from '@/shared/enums/categoriesMap';
import { SORT_FIELDS, type TSortType } from '@/shared/enums/sortFields';
import { SORT_ORDER } from '@/shared/enums/sortOrder';
export const useProductsFilter = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<CATEGORIES_MAP>(CATEGORIES_MAP.ALL);
  const [sortBy, setSortBy] = useState<TSortType>(SORT_FIELDS.TITLE);
  const [sortOrder, setSortOrder] = useState<SORT_ORDER>(SORT_ORDER.ASC);

  useEffect(() => {
    const category = searchParams.get('category') as CATEGORIES_MAP;
    const sort = searchParams.get('sort') as TSortType;
    const order = searchParams.get('order') as SORT_ORDER;

    if (category && Object.values(CATEGORIES_MAP).includes(category)) {
      setSelectedCategory(category);
    }

    if (sort && Object.values(SORT_FIELDS).includes(sort)) {
      setSortBy(sort);
    }

    if (order && Object.values(SORT_ORDER).includes(order)) {
      setSortOrder(order);
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedCategory !== CATEGORIES_MAP.ALL) {
      dispatch(getProductsByCategory(selectedCategory));
    } else {
      dispatch(getProducts());
    }
  }, [selectedCategory, dispatch]);

  const updateSearchParams = (params: Record<string, string>) => {
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev);
      Object.entries(params).forEach(([key, value]) => {
        updated.set(key, value);
      });
      return updated;
    });
  };

  return {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    updateSearchParams,
  };
};
