import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
  entities: [],
  isLoading: false,
  status: null,
};

export const getAllEntities = createAsyncThunk(
  'entities/getAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/entities');
      return data;
    } catch (error) {
      console.log('Error fetching entities:', error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createEntity = createAsyncThunk(
  'entities/create',
  async (entityData, thunkAPI) => {
    try {
      const { data } = await axios.post('/entities', entityData);
      return data;
    } catch (error) {
      console.log('Error creating entity:', error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeEntity = createAsyncThunk(
  'entities/remove',
  async (entityId, thunkAPI) => {
    try {
      await axios.delete(`/entities/${entityId}`);
      return entityId;
    } catch (error) {
      console.log('Error deleting entity:', error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateEntity = createAsyncThunk(
  'entities/update',
  async (updatedEntity, thunkAPI) => {
    try {
      const { data } = await axios.put(`/entities/${updatedEntity.id}`, updatedEntity);
      return data;
    } catch (error) {
      console.log('Error updating entity:', error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const entitySlice = createSlice({
  name: 'entity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all entities
      .addCase(getAllEntities.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(getAllEntities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entities = action.payload;
      })
      .addCase(getAllEntities.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.message;
      })

      // Create entity
      .addCase(createEntity.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(createEntity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entities.push(action.payload);
      })
      .addCase(createEntity.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.message;
      })

      // Remove entity
      .addCase(removeEntity.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(removeEntity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entities = state.entities.filter(entity => entity._id !== action.payload);
      })
      .addCase(removeEntity.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.message;
      })

      // Update entity
      .addCase(updateEntity.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(updateEntity.fulfilled, (state, action) => {
        state.isLoading = false;
        // Find the updated entity and update it in the state
        const index = state.entities.findIndex(entity => entity._id === action.payload._id);
        if (index !== -1) {
          state.entities[index] = action.payload;
        }
      })
      .addCase(updateEntity.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.message;
      });
  },
});

export default entitySlice.reducer;
