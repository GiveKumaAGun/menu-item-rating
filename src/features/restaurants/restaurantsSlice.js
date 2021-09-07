import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { uniq } from "underscore";
import { fetchUserInfo } from "../user/userSlice";

export const fetchAllRestaurants = createAsyncThunk(
  'restaurants/fetchAllRestaurants',
  async () => {
    const response = await axios.get(`/api/restaurants`)
    return response.data
  }
)

export const postRestaurant = createAsyncThunk(
  'restaurants/postRestaurant',
  async (object) => {
    console.log(object)
    const response = await axios.post(`/api/restaurants/?name=${object.name}&address=${object.address}`)
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
    },
    addRestaurant: postRestaurant(),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRestaurants.fulfilled, (state, action) => {
        state.all = action.payload;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        const restaurants = action.payload.data.map((review) => {
          return review.restaurant_id
        })
        state.visited = uniq(restaurants)
      })
  }
})

export const { getAllRestaurants, setSelectedRestaurant, addRestaurant } = restaurantsSlice.actions;


export default restaurantsSlice.reducer;
