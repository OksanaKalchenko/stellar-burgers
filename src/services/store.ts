import { configureStore, combineSlices } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { constructorSlice } from './slices/constructorSlice';
import { createOrderSlice } from './slices/createOrderSlice';
import { feedsSlice } from './slices/feedsSlice';
import { ingredientsSlise } from './slices/ingredientsSlice';
import { userOrdersSlice } from './slices/userOrdersSlice';
import { userSlice } from './slices/userSlice';

export const rootReducer = combineSlices(
  constructorSlice,
  createOrderSlice,
  feedsSlice,
  ingredientsSlise,
  userOrdersSlice,
  userSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
