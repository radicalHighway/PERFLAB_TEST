import { cartReducer } from '@/entities/cart';
import { productReducer } from '@/entities/product';
import {
  loadCartFromStorage,
  saveCartToStorage,
} from '@/shared/utils/localStorage';
import { configureStore } from '@reduxjs/toolkit';
const preloadedCartState = loadCartFromStorage();
const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: preloadedCartState ? preloadedCartState : undefined,
  },
});

store.subscribe(() => {
  const { cart } = store.getState();
  saveCartToStorage(cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
