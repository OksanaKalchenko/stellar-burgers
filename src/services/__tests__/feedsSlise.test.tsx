import { describe, expect, test } from '@jest/globals';
import {
  feedsSlice,
  getAllFeeds,
  getOrdersFeeds,
  getTotalFeeds,
  getTotalTodayFeeds,
  initialState
} from '../slices/feedsSlice';
import { configureStore } from '@reduxjs/toolkit';

describe('Тест feedsSlice', () => {
  const feedsMock = {
    orders: [
      {
        _id: '67158230d829be001c7775ea',
        ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0940'],
        status: 'done',
        name: 'Флюоресцентный метеоритный бургер',
        createdAt: '2024-10-20T22:20:32.084Z',
        updatedAt: '2024-10-20T22:20:32.919Z',
        number: 57042
      },
      {
        _id: '6715ac3fd829be001c77760f',
        ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2024-10-21T01:19:59.686Z',
        updatedAt: '2024-10-21T01:20:00.608Z',
        number: 57043
      },
      {
        _id: '6715db72d829be001c777630',
        ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa0941'],
        status: 'done',
        name: 'Био-марсианский люминесцентный бургер',
        createdAt: '2024-10-21T04:41:22.773Z',
        updatedAt: '2024-10-21T04:41:23.711Z',
        number: 57044
      },
      {
        _id: '6715db77d829be001c777631',
        ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa0941'],
        status: 'done',
        name: 'Био-марсианский люминесцентный бургер',
        createdAt: '2024-10-21T04:41:27.215Z',
        updatedAt: '2024-10-21T04:41:28.093Z',
        number: 57045
      },
      {
        _id: '6715db7ed829be001c777632',
        ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa0941'],
        status: 'done',
        name: 'Био-марсианский люминесцентный бургер',
        createdAt: '2024-10-21T04:41:34.037Z',
        updatedAt: '2024-10-21T04:41:35.181Z',
        number: 57046
      }
    ],
    total: 5,
    totalToday: 5,
    isLoading: false,
    error: undefined
  };

  test('Тест селекторов getOrdersFeeds, getTotalFeeds, getTotalTodayFeeds', () => {
    const store = configureStore({
      reducer: {
        feeds: feedsSlice.reducer
      },
      preloadedState: {
        feeds: feedsMock
      }
    });
    const orders = getOrdersFeeds(store.getState());
    const total = getTotalFeeds(store.getState());
    const totalToday = getTotalTodayFeeds(store.getState());
    expect(orders).toEqual(feedsMock.orders);
    expect(total).toEqual(feedsMock.total);
    expect(totalToday).toEqual(feedsMock.totalToday);
  });

  test('Тест редьюсера getAllFeeds (fulfilled)', () => {
    const action = {
      type: getAllFeeds.fulfilled.type,
      payload: feedsMock
    };
    const stateReceived = feedsSlice.reducer(initialState, action);
    expect(stateReceived).toEqual(feedsMock);
    expect(stateReceived.isLoading).toEqual(false);
  });

  test('Тест редьюсера getAllFeeds (pending)', () => {
    const stateReceived = feedsSlice.reducer(
      initialState,
      getAllFeeds.pending('')
    );
    expect(stateReceived.isLoading).toEqual(true);
  });

  test('Тест редьюсера getAllFeeds (rejected)', () => {
    const stateReceived = feedsSlice.reducer(
      initialState,
      getAllFeeds.rejected(new Error('error'), 'ошибка')
    );
    expect(stateReceived.orders).toEqual([]);
    expect(stateReceived.total).toEqual(0);
    expect(stateReceived.totalToday).toEqual(0);
    expect(stateReceived.isLoading).toEqual(false);
    expect(stateReceived.error).toEqual('error');
  });
});
