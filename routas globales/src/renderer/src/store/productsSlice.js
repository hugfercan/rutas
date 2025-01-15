import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: JSON.parse(localStorage.getItem('products')) || [],
  sortField: null,
  sortOrder: 'asc', // 'asc' o 'desc'
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    createProduct: (state, action) => {
      const newProduct = { ...action.payload, id: Date.now().toString() }; // Asignamos un `id` único
      state.list.push(newProduct);
      localStorage.setItem('products', JSON.stringify(state.list));
    },
    deleteProduct: (state, action) => {
      state.list = state.list.filter((product) => product.id !== action.payload);
      localStorage.setItem('products', JSON.stringify(state.list));
    },
    sortProducts: (state, action) => {
      const { field } = action.payload;

      if (state.sortField === field) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortField = field;
        state.sortOrder = 'asc';
      }

      state.list.sort((a, b) => {
        if (state.sortOrder === 'asc') {
          return a[field] > b[field] ? 1 : -1;
        }
        return a[field] < b[field] ? 1 : -1;
      });

      localStorage.setItem('products', JSON.stringify(state.list));
    },
    updateProduct: (state, action) => {
      const { id, name, price, stock } = action.payload;
      const index = state.list.findIndex((product) => product.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], name, price, stock };
        localStorage.setItem('products', JSON.stringify(state.list));
      }
    },
  },
});

export const { createProduct, deleteProduct, sortProducts, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
