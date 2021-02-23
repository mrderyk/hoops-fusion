import { configureStore } from '@reduxjs/toolkit';
import leadersReducer from '../features/leaders/leadersSlice';
import searchReducer from '../features/search/searchSlice';
import personnelReducer from '../features/personnel/personnelSlice';
import personnelSlice from '../features/personnel/personnelSlice';

export default configureStore({
  reducer: {
    leaders: leadersReducer,
    search: searchReducer,
    personnel: personnelReducer,
  }
})