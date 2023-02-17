import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isLoged: boolean;
}

const initialState: UserState = {
  isLoged: localStorage.getItem("jwt") != null ? true : false,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoged(state, action: PayloadAction<boolean>) {
      state.isLoged = action.payload;
      console.log(state.isLoged);
    },
  },
});

export const { setIsLoged } = UserSlice.actions;

export default UserSlice.reducer;
