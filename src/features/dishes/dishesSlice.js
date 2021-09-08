import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRestaurantDishes = createAsyncThunk(
  'dishes/fetchRestaurantDishes',
  async (rest_id) => {
    const response = await axios.get(`/api/restaurants/${rest_id}/dishes`)
    return response.data
  }
)

export const postDish = createAsyncThunk(
  'dishes/postDish',
  async (object) => {
    const response = await axios.post(`/api/restaurants/${object.rest_id}/dishes/?name=${object.name}`)
    console.log(response)
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
    },
    addDish: postDish(),
    resetDishes: (state) => {
      state.selected = null
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantDishes.fulfilled, (state, action) => {
        state.all = action.payload;
      })
  }
})

export const { getRestaurantDishes, setSelectedDish, resetDishes } = dishesSlice.actions;


export default dishesSlice.reducer;
