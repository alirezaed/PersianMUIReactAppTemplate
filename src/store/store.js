import { createStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import loadingReducer from './slices/loadingSlice';
import toastReducer from './slices/toastReducer';
import modalReducer from './slices/modalSlice';
import notificationReducer from './slices/notifications';

const reducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  toast: toastReducer,
  modal: modalReducer,
  notifications: notificationReducer
});

const store = createStore(reducer);

export default store;
