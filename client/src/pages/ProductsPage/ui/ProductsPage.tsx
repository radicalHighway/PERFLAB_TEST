import imgProd from '@/assets/img_prod.jpg';
import { addToCart } from '@/entities/cart/slice/cartSlice';
import { CATEGORIES_MAP } from '@/shared/enums/categoriesMap';
import {  SORT_FIELDS, type TSortType } from '@/shared/enums/sortFields';
import { SORT_ORDER } from '@/shared/enums/sortOrder';
import { useAppDispatch, useAppSelector, usePagination, useProductsFilter } from '@/shared/hooks';
import styles from './styles.module.css';
import { capitalize } from "@/shared/utils"
import { useMemo } from "react"

const ITEMS_PER_PAGE = 6;

export const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(state => state.product);


  const {
  selectedCategory,
  setSelectedCategory,
  sortBy,
  sortOrder,
  setSortBy,
  setSortOrder,
  updateSearchParams,
} = useProductsFilter();

const {
  currentPage,
  setCurrentPage,
  getPageItems,
  totalPages,
} = usePagination(1, ITEMS_PER_PAGE);

const handleCategoryChange = (category: CATEGORIES_MAP) => {
  setCurrentPage(1);
  setSelectedCategory(category);
  updateSearchParams({
    page: '1',
    category,
    sort: sortBy,
    order: sortOrder,
  });
};

const handleSort = (field: TSortType) => {
  const newOrder =
    field === sortBy && sortOrder === SORT_ORDER.ASC
      ? SORT_ORDER.DESC
      : SORT_ORDER.ASC;

  setSortBy(field);
  setSortOrder(newOrder);

  updateSearchParams({
    page: '1',
    sort: field,
    order: newOrder,
    category: selectedCategory,
  });
};

const handlePageChange = (page: number) => {
  setCurrentPage(page);
  updateSearchParams({
    page: page.toString(),
    sort: sortBy,
    order: sortOrder,
    category: selectedCategory,
  });
};

const filteredProducts = useMemo(() =>
  selectedCategory === CATEGORIES_MAP.ALL
    ? products
    : products.filter(product => product.category === selectedCategory),
  [products, selectedCategory]
);

  const sortedItems = useMemo(() => {
  return [...filteredProducts].sort((a, b) => {
    if (
      !a.title ||
      !b.title ||
      typeof a.price !== 'number' ||
      typeof b.price !== 'number'
    ) return 0;

    if (sortBy === SORT_FIELDS.TITLE) {
      return sortOrder === SORT_ORDER.ASC
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }

    return sortOrder ===SORT_ORDER.ASC ? a.price - b.price : b.price - a.price;
  });
}, [filteredProducts, sortBy, sortOrder]);

const paginatedItems = getPageItems(sortedItems);
const totalPagesCount = totalPages(sortedItems); 

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <h2>Loading products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Error loading products</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.products}>
        <div className={styles.header}>
          <h1>
            {capitalize(selectedCategory)}
          </h1>
          <div className={styles.filters}>
            <div className={styles.categories}>
              {Object.values(CATEGORIES_MAP).map(cat => (
                <button
                  key={cat}
                  className={selectedCategory === cat ? styles.active : ''}
                  onClick={() => handleCategoryChange(cat as CATEGORIES_MAP)}>
                  {cat}
                </button>
              ))}
            </div>
            <div className={styles.sorting}>
              <button
                className={sortBy === SORT_FIELDS.TITLE ? styles.active : ''}
                onClick={() => {
                  console.log('Title sort button clicked!');
                  handleSort(SORT_FIELDS.TITLE);
                }}>
                Sort by Name{' '}
                {sortBy === SORT_FIELDS.TITLE && (sortOrder === SORT_ORDER.ASC ? '↑' : '↓')}
              </button>
              <button
                className={sortBy === SORT_FIELDS.PRICE ? styles.active : ''}
                onClick={() => {
                  console.log('Price sort button clicked!');
                  handleSort(SORT_FIELDS.PRICE);
                }}>
                Sort by Price{' '}
                {sortBy === SORT_FIELDS.PRICE && (sortOrder === SORT_ORDER.ASC ? '↑' : '↓')}
              </button>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className={styles.noProducts}>
            <h2>No products found in this category</h2>
            <p>
              Debug: filtered products array length is {filteredProducts.length}
            </p>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {paginatedItems.map(item => (
                <div key={item.id} className={styles.productCard}>
                  <div className={styles.imageContainer}>
                    <img
                      src={imgProd}
                      alt={item.title}
                      className={styles.productImage}
                    />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p className={styles.price}>${item.price}</p>
                  <button onClick={() => dispatch(addToCart(item))}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {totalPagesCount > 1 && (
              <div className={styles.pagination}>
                {Array.from({ length: totalPagesCount }, (_, i) => i + 1).map(
                  page => (
                    <button
                      key={page}
                      className={page === currentPage ? styles.active : ''}
                      onClick={() => handlePageChange(page)}>
                      {page}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
