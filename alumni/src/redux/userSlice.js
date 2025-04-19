import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setuserDetails:(state,action)=>{
        state.user=action.payload
    }
  },
})

export const { setuserDetails } = userSlice.actions

export default userSlice.reducer