// client/src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slice/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
