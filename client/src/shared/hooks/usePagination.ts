import type { ArrayProductsType } from "@/entities/product"
import {useState} from 'react';

export const usePagination = (initialPage=1, itemsPerPage = 6) =>{
const [currentPage, setCurrentPage] = useState(initialPage);

const getPageItems =(items: ArrayProductsType) =>{
  const startIndex = (currentPage - 1) * itemsPerPage
  return items.slice(startIndex, startIndex+itemsPerPage);
}

const totalPages = (items : ArrayProductsType) => Math.ceil(items.length/ itemsPerPage);

return {
  currentPage,
  setCurrentPage,
  getPageItems,
  totalPages,
}
}