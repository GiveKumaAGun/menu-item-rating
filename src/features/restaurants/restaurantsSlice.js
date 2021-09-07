import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { unique } from "underscore";
import { fetchUserInfo } from "../user/userSlice";

export const fetchAllRestaurants = createAsyncThunk(
  'restaurants/fetchAllRestaurants',
  async () => {
    const response = await axios.get(`/restaurants`)
    return response.data
  }
)



export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: { all: null, selected: null, visited: null }, 
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
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        console.log(action)
        console.log(state.all)
        const restaurants = action.payload.data.map((review) => {
          return {
            id: review.restaurant_id,
            name: review.name,
            address: review.address
          }
        })
        state.visited = unique(restaurants, false, (object) => object.id)
      })
  }
})

export const { getAllRestaurants, setSelectedRestaurant } = restaurantsSlice.actions;


export default restaurantsSlice.reducer;
