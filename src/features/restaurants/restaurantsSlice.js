import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllRestaurants = createAsyncThunk(
  'restaurants/fetchAllRestaurants',
  async () => {
    const response = await axios.get(`/restaurants`)
    return response.data
  }
)

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: { all: null, selected: null }, 
  reducers: {
    getAllRestaurants: fetchAllRestaurants(),
    setSelectedRestaurant: (state, action) => {
      state.selected = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRestaurants.fulfilled, (state, action) => {
        state.all = action.payload;
      })
  }
})

export const { getAllRestaurants, setSelectedRestaurant } = restaurantsSlice.actions;


export default restaurantsSlice.reducer;
