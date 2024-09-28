import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { TConstructorIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIngredientsSelector,
  deleteIngredients,
  updateAll
} from '../../services/slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const constructorItems = useSelector(getIngredientsSelector);

    const swapElements = (
      state: TConstructorIngredient[],
      index: number,
      step: number
    ) => {
      const copy = [...state];
      copy[index] = copy.splice(index + step, 1, copy[index])[0];
      return copy;
    };

    // Перемещение ингридиента вниз
    const handleMoveDown = () => {
      dispatch(updateAll(swapElements(constructorItems.ingredients, index, 1)));
    };

    // Перемещение ингридиента вверх
    const handleMoveUp = () => {
      dispatch(
        updateAll(swapElements(constructorItems.ingredients, index, -1))
      );
    };

    // Удаление ингридиента из конструктора
    const handleClose = () => {
      dispatch(deleteIngredients(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
