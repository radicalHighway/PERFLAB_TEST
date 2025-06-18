import imgProd from '@/assets/img_prod.jpg';
import { addToCart } from '@/entities/cart/slice/cartSlice';
import {
  getProducts,
  getProductsByCategory,
} from '@/entities/product/api/productThunkApi';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import styles from './styles.module.css';

const ITEMS_PER_PAGE = 6;
const CATEGORIES = ['all', 'food', 'clothes', 'electronics'];

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(state => state.product);

  // Debug logging
  console.log('ProductsPage state:', { products, isLoading, error });

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'title' | 'price'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const filterCategory = searchParams.get('category');
    console.log('Dispatching category:', filterCategory);
    if (filterCategory && filterCategory.toLowerCase() !== 'all') {
      dispatch(getProductsByCategory(filterCategory));
    } else {
      dispatch(getProducts());
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    const page = searchParams.get('page');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    const filterCategory = searchParams.get('category');

    if (page) setCurrentPage(Number(page));
    if (sort) setSortBy(sort as 'title' | 'price');
    if (order) setSortOrder(order as 'asc' | 'desc');
    if (filterCategory) setSelectedCategory(filterCategory);
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setCurrentPage(1);
    setSearchParams({
      page: '1',
      category: category.toLowerCase(),
      sort: sortBy,
      order: sortOrder,
    });
  };

  const handleSort = (field: 'title' | 'price') => {
    console.log('handleSort called with field:', field);
    console.log('Current sortBy:', sortBy, 'sortOrder:', sortOrder);

    const newOrder = field === sortBy && sortOrder === 'asc' ? 'desc' : 'asc';
    console.log('New order will be:', newOrder);

    setSortBy(field);
    setSortOrder(newOrder);

    const newParams = {
      page: '1',
      sort: field,
      order: newOrder,
      category: selectedCategory,
    };
    console.log('Setting search params:', newParams);
    setSearchParams(newParams);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({
      page: page.toString(),
      sort: sortBy,
      order: sortOrder,
      category: selectedCategory,
    });
  };

  const filteredProducts =
    selectedCategory.toLowerCase() === 'all'
      ? products
      : products.filter(
          product =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const sortedItems = [...filteredProducts].sort((a, b) => {
    // Validate that we have the required properties
    if (
      !a.title ||
      !b.title ||
      typeof a.price !== 'number' ||
      typeof b.price !== 'number'
    ) {
      console.error('Invalid product data:', { a, b });
      return 0;
    }

    console.log('Sorting items:', {
      sortBy,
      sortOrder,
      aTitle: a.title,
      bTitle: b.title,
      aPrice: a.price,
      bPrice: b.price,
    });

    if (sortBy === 'title') {
      const result =
        sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      console.log('Title sort result:', result);
      return result;
    }

    const result = sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    console.log('Price sort result:', result);
    return result;
  });

  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = sortedItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  console.log('Processed data:', {
    productsLength: products.length,
    filteredProductsLength: filteredProducts.length,
    sortedItemsLength: sortedItems.length,
    paginatedItemsLength: paginatedItems.length,
    totalPages,
    currentPage,
    sortBy,
    sortOrder,
    selectedCategory,
    firstFewProducts: products
      .slice(0, 3)
      .map(p => ({ title: p.title, price: p.price, category: p.category })),
  });

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
            {selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)}
          </h1>
          <div className={styles.filters}>
            <div className={styles.categories}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={selectedCategory === cat ? styles.active : ''}
                  onClick={() => handleCategoryChange(cat)}>
                  {cat}
                </button>
              ))}
            </div>
            <div className={styles.sorting}>
              <button
                className={sortBy === 'title' ? styles.active : ''}
                onClick={() => {
                  console.log('Title sort button clicked!');
                  handleSort('title');
                }}>
                Sort by Name{' '}
                {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button
                className={sortBy === 'price' ? styles.active : ''}
                onClick={() => {
                  console.log('Price sort button clicked!');
                  handleSort('price');
                }}>
                Sort by Price{' '}
                {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
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

            {totalPages > 1 && (
              <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
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
