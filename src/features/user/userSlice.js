import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "underscore";

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (username) => {
    const response = await axios.get(`/api/users/${username}`)
    console.log(response.data)
    return {username, data: response.data}
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState: { username: null, restaurantList: null, dishList: null, reviewList: null }, 
  reducers: {
    getUserInfo: fetchUserInfo(),
    resetUser: (state) => {
      state.username = null
      state.restaurantList = null
      state.dishList = null
      state.reviewList = null
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.username = action.payload.username;
        const restaurants = action.payload.data.map((object) => {
          return {id: object.restaurant_id, name: object.name, address: object.address}
        })
        state.restaurantList = _.uniq(restaurants, false, (object) => object.id)
        const dishes = action.payload.data.map((object) => {
          return {id: object.dish_id, name: object.dish, rest_id: object.restaurant_id, score: object.score, comment: object.comment}
        })
        state.dishList = dishes
        state.reviewList = action.payload.data
      })
  }
})

export const { getUserInfo, resetUser } = userSlice.actions;


export default userSlice.reducer;
