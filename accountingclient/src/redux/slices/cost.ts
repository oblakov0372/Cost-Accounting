import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICost } from "../../types/cost";

interface CostState {
  costs: ICost[];
  totalSum: number;
}

const initialState: CostState = {
  costs: [],
  totalSum: 0,
};

export const CostSlice = createSlice({
  name: "cost",
  initialState,
  reducers: {
    setCosts(state, action) {
      state.costs = action.payload;
      state.totalSum = state.costs.reduce((sum, obj) => sum + obj.price, 0);
    },
    addCost(state, action) {
      state.costs.push(action.payload);
      state.totalSum += action.payload.price;
    },
    deleteCost(state, action: PayloadAction<ICost>) {
      state.costs = state.costs.filter((item) => item.id !== action.payload.id);
      state.totalSum -= action.payload.price;
    },
  },
});

export const { setCosts, addCost, deleteCost } = CostSlice.actions;

export default CostSlice.reducer;
