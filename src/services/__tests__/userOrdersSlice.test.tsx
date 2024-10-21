import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import {
  userOrdersList,
  initialState,
  userOrdersSlice,
  getUserOrders,
  userOrdersByNumber,
  getUserOrderByNumber
} from '../slices/userOrdersSlice';

describe('Тест userOrdersSlice', () => {
  const ordersMock = {
    orders: [
      {
        _id: '67164125d829be001c777707',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-10-21T11:55:17.748Z',
        updatedAt: '2024-10-21T11:55:18.499Z',
        number: 57079
      },
      {
        _id: '67162dfdd829be001c7776ee',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный метеоритный бургер',
        createdAt: '2024-10-21T10:33:33.939Z',
        updatedAt: '2024-10-21T10:33:34.686Z',
        number: 57078
      },
      {
        _id: '67162d59d829be001c7776eb',
        ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2024-10-21T10:30:49.520Z',
        updatedAt: '2024-10-21T10:30:50.445Z',
        number: 57077
      }
    ],
    isLoading: true
  };

  const ordersMockByNumber = {
    success: true,
    orders: [
      {
        _id: '6716585fd829be001c777740',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный био-марсианский бургер',
        createdAt: '2024-10-21T13:34:23.822Z',
        updatedAt: '2024-10-21T13:34:24.638Z',
        number: 57085,
        __v: 0
      }
    ]
  };

  test('Тест селекторов userOrdersList, userOrdersByNumber', () => {
    const store = configureStore({
      reducer: {
        orders: userOrdersSlice.reducer
      },
      preloadedState: {
        orders: ordersMock
      }
    });
    const orderRequest = userOrdersList(store.getState());
    const orderRequestByNumber = userOrdersByNumber(store.getState());

    expect(orderRequest).toEqual(ordersMock.orders);
    expect(orderRequestByNumber).toEqual(ordersMock.orders);
  });

  test('Тест редьюсера getUserOrders (fulfilled)', () => {
    const newState = userOrdersSlice.reducer(
      initialState,
      getUserOrders.fulfilled(ordersMock.orders, '')
    );
    expect(newState.orders).toEqual(ordersMock.orders);
    expect(newState.isLoading).toEqual(false);
  });

  test('Тест редьюсера getUserOrders (pending)', () => {
    const newState = userOrdersSlice.reducer(
      initialState,
      getUserOrders.pending('')
    );
    expect(newState.isLoading).toEqual(true);
  });

  test('Тест редьюсера getUserOrders (rejected)', () => {
    const newState = userOrdersSlice.reducer(
      initialState,
      getUserOrders.rejected(new Error('error'), 'тестовая ошибка')
    );
    expect(newState.isLoading).toEqual(false);
  });

  test('Тест редьюсера getUserOrderByNumber (fulfilled)', () => {
    const newState = userOrdersSlice.reducer(
      initialState,
      getUserOrderByNumber.fulfilled(ordersMockByNumber, '', 57085)
    );
    expect(newState.orders).toEqual(ordersMockByNumber.orders);
    expect(newState.isLoading).toEqual(false);
  });

  test('Тест редьюсера getUserOrderByNumber (pending)', () => {
    const newState = userOrdersSlice.reducer(
      initialState,
      getUserOrderByNumber.pending('', 57085)
    );
    expect(newState.isLoading).toEqual(true);
  });

  test('Тест редьюсера getUserOrderByNumber (rejected)', () => {
    const newState = userOrdersSlice.reducer(
      initialState,
      getUserOrderByNumber.rejected(new Error('error'), 'ошибка', 57085)
    );
    expect(newState.isLoading).toEqual(false);
  });
});
