import type { CartItem } from "../model/types";
export const loadCartFromStorage = (): CartItem[] => {
  try {
    const json = localStorage.getItem("cart");
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
};

export const saveCartToStorage = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};