import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  entities: [],
  loading: false,
};

export const createEntity = createAsyncThunk(
  "entity/createEntity",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.post("/entities", params);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllEntities = createAsyncThunk('entity/getAllEntities', async () => {
  try{
   const {data} = await axios.get('/entities') 
  } catch (error) {
    console.log(error)
  }
})

export const entitySlice = createSlice({
  name: "entity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEntity.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entities.push(action.payload);
      })
      .addCase(createEntity.rejected, (state, action) => {
        state.loading = false;
        console.error(action.payload);
      });
  },
});

export default entitySlice.reducer;
