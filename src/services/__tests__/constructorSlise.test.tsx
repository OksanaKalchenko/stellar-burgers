import { TConstructorIngredient } from '@utils-types';
import reducer, {
  addIngredients,
  deleteIngredients,
  updateAll,
  clearAll
} from '../slices/constructorSlice';

describe('burgerConstructorSlice reducer', () => {
  const bun: TConstructorIngredient = {
    id: '1',
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1225,
    image: 'bun.png',
    image_large: 'bun-large.png',
    image_mobile: 'bun-mobile.png'
  };

  const ingredient: TConstructorIngredient = {
    id: '2',
    _id: '2',
    name: 'Сыр с астероидной плесенью',
    type: 'main',
    proteins: 84,
    fat: 48,
    carbohydrates: 420,
    calories: 3377,
    price: 4142,
    image: 'cheese.png',
    image_large: 'cheese-large.png',
    image_mobile: 'cheese-mobile.png'
  };

  const initialState = {
    bun: null,
    ingredients: []
  };

  test('Добавление ингридиента', () => {
    const state = reducer(initialState, addIngredients(ingredient));

    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toMatchObject({
      _id: ingredient._id,
      name: ingredient.name,
      type: ingredient.type,
      proteins: ingredient.proteins,
      fat: ingredient.fat,
      carbohydrates: ingredient.carbohydrates,
      calories: ingredient.calories,
      price: ingredient.price,
      image: ingredient.image,
      image_large: ingredient.image_large,
      image_mobile: ingredient.image_mobile
    });
    expect(state.ingredients[0].id).toBeDefined(); // Проверяем, что id сгенерирован
  });

  test('Добавление булки', () => {
    const state = reducer(initialState, addIngredients(bun));

    expect(state.bun).toMatchObject({
      _id: bun._id,
      name: bun.name,
      type: bun.type,
      proteins: bun.proteins,
      fat: bun.fat,
      carbohydrates: bun.carbohydrates,
      calories: bun.calories,
      price: bun.price,
      image: bun.image,
      image_large: bun.image_large,
      image_mobile: bun.image_mobile
    });
    expect(state.bun?.id).toBeDefined();
  });

  test('Удаление ингредиента', () => {
    const initialWithIngredient = {
      ...initialState,
      ingredients: [ingredient]
    };

    const state = reducer(initialWithIngredient, deleteIngredients(ingredient));

    expect(state.ingredients.length).toBe(0);
  });

  test('Очистка всех ингредиентов и булки', () => {
    const stateWithIngredients = {
      bun,
      ingredients: [ingredient]
    };

    const state = reducer(stateWithIngredients, clearAll());

    expect(state.bun).toBeNull();
    expect(state.ingredients.length).toBe(0);
  });

  test('Изменение порядка ингредиентов', () => {
    const ingredient2: TConstructorIngredient = {
      id: '3',
      _id: '3',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'cotlet.png',
      image_large: 'cotlet-large.png',
      image_mobile: 'cotlet-mobile.png'
    };

    const initialWithIngredients = {
      ...initialState,
      ingredients: [ingredient, ingredient2]
    };

    const updatedIngredients = [ingredient2, ingredient];

    const state = reducer(
      initialWithIngredients,
      updateAll(updatedIngredients)
    );

    expect(state.ingredients).toEqual(updatedIngredients);
  });
});
