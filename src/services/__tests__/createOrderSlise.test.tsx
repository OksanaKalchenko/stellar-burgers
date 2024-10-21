import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import {
  getOrderModalData,
  getOrderRequest,
  createOrderSlice,
  createOrder,
  initialState,
  resetOrder
} from '../slices/createOrderSlice';

describe('Тест createOrderSlice', () => {
  const orderMock = {
    orderRequest: false,
    orderModalData: {
      _id: '67166113d829be001c777765',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2024-10-21T14:11:31.330Z',
      updatedAt: '2024-10-21T14:11:31.939Z',
      number: 57087
    },
    error: undefined
  };

  const orderReceivedMock = {
    success: true,
    name: 'Флюоресцентный люминесцентный бургер',
    order: {
      _id: '67165bc9d829be001c777753',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-10-21T13:48:57.524Z',
      updatedAt: '2024-10-21T13:48:58.422Z',
      number: 57086,
      owner: ''
    }
  };

  test('Тест селекторов getOrderRequest, getOrderModalData', () => {
    const store = configureStore({
      reducer: {
        newOrder: createOrderSlice.reducer
      },
      preloadedState: {
        newOrder: orderMock
      }
    });
    const orderRequest = getOrderRequest(store.getState());
    const modal = getOrderModalData(store.getState());

    expect(orderRequest).toEqual(orderMock.orderRequest);
    expect(modal).toEqual(orderMock.orderModalData);
  });

  test('Тест редьюсера resetOrder', () => {
    const state = {
      orderRequest: true,
      orderModalData: orderReceivedMock.order,
      error: 'undefined'
    };
    const stateReceived = createOrderSlice.reducer(state, resetOrder());
    expect(stateReceived).toEqual(initialState);
  });

  test('Тест редьюсера createOrder (fulfilled)', () => {
    const newState = createOrderSlice.reducer(
      initialState,
      createOrder.fulfilled(orderReceivedMock, '', [''])
    );
    expect(newState.orderRequest).toEqual(false);
    expect(newState.orderModalData).toEqual(orderReceivedMock.order);
  });

  test('Тесты редьюсера createOrder (pending)', () => {
    const newState = createOrderSlice.reducer(
      initialState,
      createOrder.pending('', [])
    );
    expect(newState.orderRequest).toEqual(true);
  });

  test('Тесты редьюсера createOrder (rejected)', () => {
    const newState = createOrderSlice.reducer(
      initialState,
      createOrder.rejected(new Error('error'), 'ошибка', [''])
    );
    expect(newState.error).toEqual('error');
  });
});
