import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import entitySlice from "./features/entity/entitySlice";


export const store = configureStore({
  reducer: {
    auth: authSlice,
    entity: entitySlice,
   
  },
});