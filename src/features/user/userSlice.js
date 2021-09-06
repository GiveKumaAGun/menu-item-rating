import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "underscore";

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (username) => {
    const response = await axios.get(`/${username}`)
    console.log(response.data)
    return {username, data: response.data}
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState: { username: null, restaurantList: null, reviewList: null }, 
  reducers: {
    getUserInfo: fetchUserInfo(),

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.username = action.payload.username;
        const restaurants = action.payload.data.map((object) => {
          return {id: object.restaurant_id, name: object.name}
        })
        state.restaurantList = _.uniq(restaurants, false, (object) => object.id)
        state.reviewList = action.payload.data
      })
  }
})

export const { selectUser, getUserInfo } = userSlice.actions;


export default userSlice.reducer;
