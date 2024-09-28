import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuid } from 'uuid';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

// Слайс для управления состоянием конструктора бургера
export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredients: {
      reducer: (
        state: TConstructorState,
        action: PayloadAction<TConstructorIngredient>
      ) => {
        // Если добавляем булочку, заменяем текущую
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
          // Иначе добавляем ингредиент в список
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = uuid();
        return { payload: { ...ingredient, id } };
      }
    },
    // Редьюсер для удаления ингредиентов из конструктора
    deleteIngredients: (
      state: TConstructorState,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    // Редьюсер для очистки конструктора
    clearAll: (state: TConstructorState) => {
      state.bun = initialState.bun;
      state.ingredients = initialState.ingredients;
    },
    updateAll: (
      state: TConstructorState,
      action: PayloadAction<TConstructorIngredient[]>
    ) => {
      state.ingredients = action.payload;
    }
  },
  selectors: {
    getIngredientsSelector: (state: TConstructorState) => state
  }
});

export const constructorReducer = constructorSlice.reducer;

export const { addIngredients, deleteIngredients, clearAll, updateAll } =
  constructorSlice.actions;
export const { getIngredientsSelector } = constructorSlice.selectors;
