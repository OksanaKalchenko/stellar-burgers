import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

type TFeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | undefined;
  isLoading: boolean;
};

export const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: undefined,
  isLoading: false
};

export const getAllFeeds = createAsyncThunk('order/getAll', getFeedsApi);

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getOrdersFeeds: (state) => state.orders,
    getTotalFeeds: (state) => state.total,
    getTotalTodayFeeds: (state) => state.totalToday
  },
  extraReducers(builder) {
    builder
      .addCase(getAllFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.error = undefined;
        state.isLoading = false;
      })
      .addCase(getAllFeeds.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getAllFeeds.rejected, (state, action) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
        state.error = action.error.message;
        state.isLoading = false;
      });
  }
});

export const { getOrdersFeeds, getTotalFeeds, getTotalTodayFeeds } =
  feedsSlice.selectors;
