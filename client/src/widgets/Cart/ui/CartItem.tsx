import type { RootState } from '@/app/store/store';
import {
  removeFromCart,
  updateQuantity,
} from '@/entities/cart/slice/cartSlice';
import type { IProduct } from '@/entities/product';
import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';

type CartItemType = IProduct & { quantity: number };

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
}

const areEqual = (prev: CartItemProps, next: CartItemProps) => {
  return (
    prev.item.id === next.item.id &&
    prev.item.title === next.item.title &&
    prev.item.price === next.item.price &&
    prev.item.quantity === next.item.quantity &&
    prev.onRemove === next.onRemove &&
    prev.onQuantityChange === next.onQuantityChange
  );
};

const CartItem = memo(({ item, onRemove, onQuantityChange }: CartItemProps) => {
  return (
    <div className={styles.cartItem}>
      <h3>{item.title}</h3>
      <p>Price: ${item.price}</p>
      <div className={styles.quantity}>
        <button
          onClick={() =>
            onQuantityChange(item.id, Math.max(0, item.quantity - 1))
          }>
          -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>
          +
        </button>
      </div>
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
}, areEqual);

export const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isOpen, setIsOpen] = useState(false);

  const handleRemove = useCallback(
    (id: number) => {
      dispatch(removeFromCart(id));
    },
    [dispatch]
  );

  const handleQuantityChange = useCallback(
    (id: number, quantity: number) => {
      if (quantity === 0) {
        dispatch(removeFromCart(id));
      } else {
        dispatch(updateQuantity({ id, quantity }));
      }
    },
    [dispatch]
  );

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const itemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const toggleCart = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  const renderedItems = useMemo(
    () =>
      cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={handleRemove}
          onQuantityChange={handleQuantityChange}
        />
      )),
    [cartItems, handleRemove, handleQuantityChange]
  );

  return (
    <>
      {/* Cart Icon */}
      <div className={styles.cartIcon} onClick={toggleCart}>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'>
          <path d='M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' />
          <path d='M20 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' />
          <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6' />
        </svg>
        {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
      </div>

      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={closeCart} />}

      {/* Cart Popup */}
      <div className={`${styles.cartPopup} ${isOpen ? styles.open : ''}`}>
        <div className={styles.cartHeader}>
          <h2>Shopping Cart</h2>
          <button className={styles.closeButton} onClick={closeCart}>
            ×
          </button>
        </div>

        <div className={styles.cartContent}>
          {cartItems.length === 0 ? (
            <p className={styles.emptyCart}>Your cart is empty</p>
          ) : (
            <>
              {renderedItems}
              <div className={styles.total}>
                <h3>Total: ${total.toFixed(2)}</h3>
                <button className={styles.checkoutButton}>Checkout</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
