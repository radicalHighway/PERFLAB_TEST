export const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    return serializedCart ? JSON.parse(serializedCart) : undefined;
  } catch (e) {
    console.warn("Ошибка при чтении cart из localStorage", e);
    return undefined;
  }
};

export const saveCartToStorage = (cartState: unknown) => {
  try {
    const serializedCart = JSON.stringify(cartState);
    localStorage.setItem("cart", serializedCart);
  } catch (e) {
    console.warn("Ошибка при сохранении cart в localStorage", e);
  }
};