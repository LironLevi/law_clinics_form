import { configureStore } from '@reduxjs/toolkit'
import isOpenSliceReducer from "./sideColState"

// config the store 
export const store = configureStore({
  reducer: {
    isOpen: isOpenSliceReducer,
  }
});
