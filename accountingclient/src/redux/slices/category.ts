import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startTransition } from "react";
import { ICategory } from "../../types/category";

interface CategoryState {
  categories: ICategory[];
}

const initialState: CategoryState = {
  categories: [],
};

export const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },

    addCategory(state, action) {
      state.categories.push(action.payload);
    },

    deleteCategory(state, action) {
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload
      );
    },
  },
});

export const { setCategories, addCategory, deleteCategory } =
  CategorySlice.actions;

export default CategorySlice.reducer;
