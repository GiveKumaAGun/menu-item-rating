import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRestaurantDishes = createAsyncThunk(
  'dishes/fetchRestaurantDishes',
  async (rest_id) => {
    const response = await axios.get(`/restaurants/${rest_id}/dishes`)
    return response.data
  }
)

export const dishesSlice = createSlice({
  name: "dishes",
  initialState: { all: null, selected: null }, 
  reducers: {
    getRestaurantDishes: fetchRestaurantDishes(),
    setSelectedDish: (state, action) => {
      state.selected = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantDishes.fulfilled, (state, action) => {
        state.all = action.payload;
      })
  }
})

export const { getRestaurantDishes, setSelectedDish } = dishesSlice.actions;


export default dishesSlice.reducer;
