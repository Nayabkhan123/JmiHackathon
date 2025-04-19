import { configureStore } from '@reduxjs/toolkit'
import userreducer from './userSlice'
export const store = configureStore({
  reducer: {
    user: userreducer,
  },
})