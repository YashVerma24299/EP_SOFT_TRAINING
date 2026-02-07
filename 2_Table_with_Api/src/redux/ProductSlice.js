import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    total: 0,
    productDetail: null,
  },

  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products;
      state.total = action.payload.total;
    },

    setProductDetail: (state, action) => {
      state.productDetail = action.payload;
    },
  },
});
export const { setProducts, setProductDetail } = productSlice.actions;
export default productSlice.reducer;


export const fetchProducts = (page, limit) => async (dispatch) => {
  const skip = (page - 1) * limit;

  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );
  const data = await res.json();

  dispatch(setProducts({ products: data.products, total: data.total }));
};

export const fetchProductById = (id) => async (dispatch) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();
  dispatch(setProductDetail(data));
};
