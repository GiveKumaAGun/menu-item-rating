import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postReview = createAsyncThunk(
  'reviews/postReview',
  async (object) => {
    console.log(object)
    const response = await axios.post(`/api/dishes/${object.dish_id}/?username=${object.username}&score=${object.score}&comment=${object.comment}`)
    return response.data
  }
)

export const reviewSlice = createSlice({
  name: "review",
  initialState: { all: null, selected: null }, 
  reducers: {
    addReview: postReview(),
  },
})

export const { addReview } = reviewSlice.actions;


export default reviewSlice.reducer;
