import { rootReducer } from '../store';
import { createOrderSlice } from '../slices/createOrderSlice';
import { userSlice } from '../slices/userSlice';
import { feedsSlice } from '../slices/feedsSlice';
import { ingredientsSlise } from '../slices/ingredientsSlice';
import { constructorSlice } from '../slices/constructorSlice';
import { userOrdersSlice } from '../slices/userOrdersSlice';

describe('rootReducer', () => {
  test('Тест store', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toHaveProperty(createOrderSlice.name);
    expect(state).toHaveProperty(userSlice.name);
    expect(state).toHaveProperty(feedsSlice.name);
    expect(state).toHaveProperty(ingredientsSlise.name);
    expect(state).toHaveProperty(constructorSlice.name);
    expect(state).toHaveProperty(userOrdersSlice.name);
  });
});
