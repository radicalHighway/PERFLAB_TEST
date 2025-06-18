import { addToCart } from '@/entities/cart/slice/cartSlice';
import { getProducts } from '@/entities/product/api/productThunkApi';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import styles from './styles.module.css';

const ITEMS_PER_PAGE = 6;
const CATEGORIES = ['All', 'Food', 'Clothes', 'Electronics'];

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(state => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'title' | 'price'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const page = searchParams.get('page');
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (page) setCurrentPage(Number(page));
    if (category) setSelectedCategory(category);
    if (sort) setSortBy(sort as 'title' | 'price');
    if (order) setSortOrder(order as 'asc' | 'desc');
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setSearchParams({
      page: '1',
      category,
      sort: sortBy,
      order: sortOrder,
    });
  };

  const handleSort = (field: 'title' | 'price') => {
    const newOrder = field === sortBy && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortOrder(newOrder);
    setSearchParams({
      page: currentPage.toString(),
      category: selectedCategory,
      sort: field,
      order: newOrder,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({
      page: page.toString(),
      category: selectedCategory,
      sort: sortBy,
      order: sortOrder,
    });
  };

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(product => product.category === selectedCategory);

  const sortedItems = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'title') {
      return sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = sortedItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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
          <h1>All Products</h1>
          <div className={styles.filters}>
            <div className={styles.categories}>
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  className={selectedCategory === category ? styles.active : ''}
                  onClick={() => handleCategoryChange(category)}>
                  {category}
                </button>
              ))}
            </div>
            <div className={styles.sorting}>
              <button
                className={sortBy === 'title' ? styles.active : ''}
                onClick={() => handleSort('title')}>
                Sort by Name{' '}
                {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button
                className={sortBy === 'price' ? styles.active : ''}
                onClick={() => handleSort('price')}>
                Sort by Price{' '}
                {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className={styles.noProducts}>
            <h2>No products found in this category</h2>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {paginatedItems.map(item => (
                <div key={item.id} className={styles.productCard}>
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
