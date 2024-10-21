import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import {
  isAuthCheckedSelector,
  getUser,
  getUserName,
  getError,
  userSlice,
  initialState,
  registerUser,
  loginUser,
  getUserData,
  updateUser,
  logoutUser
} from '../slices/userSlice';

describe('Тест userSlice', () => {
  const userMockData = {
    isAuthChecked: true,
    user: {
      email: 'oksana@gmail.com',
      name: 'Оксана'
    },
    error: ''
  };

  const userMockDataUpdated = {
    isAuthChecked: true,
    user: {
      email: 'oksana@gmail.com',
      name: 'Оксана1'
    },
    error: ''
  };

  const userRegisterData = {
    email: 'oksana@gmail.com',
    name: 'Оксана',
    password: '12345'
  };

  const userRegisterDataUpdated = {
    email: 'oksana@gmail.com',
    name: 'Оксана1',
    password: '12345'
  };

  const userResponce = {
    success: true,
    user: {
      email: 'oksana@gmail.com',
      name: 'Оксана'
    }
  };

  const userResponceUpdated = {
    success: true,
    user: {
      email: 'oksana@gmail.com',
      name: 'Оксана1'
    }
  };

  const stateConstructor = (action: { type: string; payload?: {} }) =>
    userSlice.reducer(initialState, action);

  test('Тест селекторов isAuthCheckedSelector, getUser, getUserName, getError', () => {
    const store = configureStore({
      reducer: {
        user: userSlice.reducer
      },
      preloadedState: {
        user: userMockData
      }
    });
    const isAuthChecked = isAuthCheckedSelector(store.getState());
    const user = getUser(store.getState());
    const name = getUserName(store.getState());
    const error = getError(store.getState());
    expect(isAuthChecked).toEqual(userMockData.isAuthChecked);
    expect(user).toEqual(userMockData.user);
    expect(name).toEqual(userMockData.user.name);
    expect(error).toEqual(userMockData.error);
  });

  test('Тест редьюсера registerUser (fulfilled)', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: userResponce
    };
    expect(stateConstructor(action)).toEqual(userMockData);
  });

  test('Тест редьюсера registerUser (pending)', () => {
    const newState = userSlice.reducer(
      initialState,
      registerUser.pending('', userRegisterData)
    );
    expect(newState.isAuthChecked).toEqual(false);
    expect(newState.error).toEqual('');
  });

  test('Тест редьюсера registerUser (rejected)', () => {
    const newState = userSlice.reducer(
      initialState,
      registerUser.rejected(new Error('error'), 'ошибка', userRegisterData)
    );
    expect(newState.error).toEqual('error');
  });

  test('Тест редьюсера loginUser (fulfilled)', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: userResponce
    };
    expect(stateConstructor(action)).toEqual(userMockData);
  });

  test('Тест редьюсера loginUser (pending)', () => {
    const newState = userSlice.reducer(
      initialState,
      loginUser.pending('', userRegisterData)
    );
    expect(newState.isAuthChecked).toEqual(false);
    expect(newState.error).toEqual('');
  });

  test('Тест редьюсера loginUser (rejected)', () => {
    const newState = userSlice.reducer(
      initialState,
      loginUser.rejected(new Error('error'), 'ошибка', userRegisterData)
    );
    expect(newState.error).toEqual('error');
    expect(newState.isAuthChecked).toEqual(false);
  });

  test('Тесты редьюсера getUserData (fulfilled)', () => {
    const action = {
      type: getUserData.fulfilled.type,
      payload: userResponce
    };
    expect(stateConstructor(action)).toEqual(userMockData);
  });

  test('Тесты редьюсера getUserData (pending)', () => {
    const newState = userSlice.reducer(initialState, getUserData.pending(''));
    expect(newState.isAuthChecked).toEqual(false);
    expect(newState.error).toEqual('');
  });

  test('Тесты редьюсера getUserData (rejected)', () => {
    const newState = userSlice.reducer(
      initialState,
      getUserData.rejected(new Error('error'), 'ошибка')
    );
    expect(newState.error).toEqual('error');
    expect(newState.isAuthChecked).toEqual(false);
  });

  test('Тесты редьюсера updateUser (fulfilled)', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: userResponceUpdated
    };
    expect(stateConstructor(action)).toEqual(userMockDataUpdated);
  });

  test('Тесты редьюсера updateUser (pending)', () => {
    const newState = userSlice.reducer(
      initialState,
      updateUser.pending('', userRegisterDataUpdated)
    );
    expect(newState.isAuthChecked).toEqual(false);
    expect(newState.error).toEqual('');
  });

  test('Тесты редьюсера updateUser (rejected)', () => {
    const newState = userSlice.reducer(
      initialState,
      updateUser.rejected(new Error('error'), 'ошибка', userRegisterDataUpdated)
    );
    expect(newState.error).toEqual('error');
    expect(newState.isAuthChecked).toEqual(false);
  });

  test('Тесты редьюсера logoutUser (fulfilled)', () => {
    const action = {
      type: logoutUser.fulfilled.type,
      payload: userResponce
    };
    expect(stateConstructor(action)).toEqual(initialState);
  });

  test('Тесты редьюсера logoutUser (pending)', () => {
    const newState = userSlice.reducer(initialState, logoutUser.pending(''));
    expect(newState.isAuthChecked).toEqual(false);
    expect(newState.error).toEqual('');
  });

  test('Тесты редьюсера logoutUser (rejected)', () => {
    const newState = userSlice.reducer(
      initialState,
      logoutUser.rejected(new Error('error'), 'ошибка')
    );
    expect(newState.error).toEqual('error');
    expect(newState.isAuthChecked).toEqual(false);
  });
});
