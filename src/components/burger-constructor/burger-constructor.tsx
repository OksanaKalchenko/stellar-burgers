import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearAll,
  getIngredientsSelector
} from '../../services/slices/constructorSlice';
import {
  createOrder,
  resetOrder,
  getOrderRequest,
  getOrderModalData
} from '../../services/slices/createOrderSlice';
import { isAuthCheckedSelector } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderModalData = useSelector(getOrderModalData);
  const constructorItems = useSelector(getIngredientsSelector);
  const orderRequest = useSelector(getOrderRequest);
  const isAuth = useSelector(isAuthCheckedSelector);

  useEffect(() => {
    if (orderModalData) {
      dispatch(clearAll());
    }
  }, [orderModalData]);

  // Обработчик клика на кнопку заказа
  const onOrderClick = () => {
    if (!isAuth) return navigate('/login');
    if (!constructorItems.bun || orderRequest) return;
    const orderData = [
      constructorItems.bun._id,
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];
    dispatch(createOrder(orderData));
  };

  // Обработчик закрытия модального окна заказа
  const closeOrderModal = () => {
    dispatch(resetOrder());
    navigate('/');
  };

  // Общая стоимость заказа
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
