import { configureStore } from '@reduxjs/toolkit';
import sportclubReducer from '../redux/feature/sportclub/SportClubSlice';
import mapSlices from './feature/mapSlice/MapSlices';

export const store = configureStore({
  reducer: {
    sportclubs: sportclubReducer,
    map:mapSlices
  },
});
