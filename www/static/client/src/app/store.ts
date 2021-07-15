import { configureStore } from '@reduxjs/toolkit';
import leadersReducer from '../features/leaders/leadersSlice';
import searchReducer from '../features/search/searchSlice';
import personnelReducer from '../features/personnel/personnelSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';

export default configureStore({
  reducer: {
    leaders: leadersReducer,
    search: searchReducer,
    personnel: personnelReducer,
    notifications: notificationsReducer,
  }
})