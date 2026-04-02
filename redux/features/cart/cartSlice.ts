// ====================================================
// 🛒 Redux: Cart Slice (Manage User Room Cart)
// ====================================================

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { createSelector } from 'reselect';

// ========== 🧩 Types & Interfaces ==========
interface SimpleRoom {
  roomId: string;
  name?: string;
  image: string;
  price?: number;
  checkInDate: string;
  checkOutDate: string;
}

interface CartItem {
  userId: string;
  room: SimpleRoom;
}

interface CartState {
  cartItems: CartItem[];
}

// ========== 🚀 Initial State ==========
const initialState: CartState = {
  cartItems: [],
};

// ========== 🔁 Reducers ==========
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ➕ Add item to cart
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      const { userId, room } = action.payload;
      const exists = state.cartItems.some(
        (item) => item.userId === userId && item.room.roomId === room.roomId,
      );
      if (!exists) state.cartItems.push(action.payload);
    },

    // ❌ Remove item from cart by roomId
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.room.roomId !== action.payload,
      );
    },

    // 🧹 Clear entire cart
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

// ==========  Selectors ==========
export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const makeSelectCartItemsByUser = (userId: string) =>
  createSelector([selectCartItems], (cartItems) =>
    cartItems.filter((item) => item.userId === userId),
  );

// ==========  Export ==========
export const { addCartItem, removeCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
