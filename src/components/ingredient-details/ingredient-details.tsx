import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { getIngredientsState } from '../../services/slices/ingredientsSlice';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

type TIngredientDetails = {
  showHeader: boolean;
};

// Компонент, который отображает подробную информацию об ингредиенте
export const IngredientDetails: FC<TIngredientDetails> = ({ showHeader }) => {
  /** TODO: взять переменную из стора */

  // Получаем список ингредиентов
  const { ingredients } = useSelector(getIngredientsState);

  // Получаем параметр id из URL
  const { id } = useParams();

  // Поиск ингредиента по id из параметра URL
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  // Если данные об ингредиенте не найдены, отображаем Preloader
  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <IngredientDetailsUI
      ingredientData={ingredientData}
      showHeader={showHeader}
    />
  );
};
