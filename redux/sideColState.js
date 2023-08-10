import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const isOpenSlice = createSlice({
  name: 'isOpen',
  initialState: {
    value : false
  },
  reducers: {
    taggleCol: state => {
      state.value = !state.value
    }
  }
})

// Action creators are generated for each case reducer function
export const { taggleCol } = isOpenSlice.actions

export default isOpenSlice.reducer