import type {} from 'cypress';
import '../support/commands';

const selectors = {
  constructorElement: '[data-cy="constructor-element"]',
  modal: '[data-cy="modal"]'
};

beforeEach(() => {
  window.localStorage.setItem('refreshToken', JSON.stringify('refreshToken'));
  cy.setCookie('accessToken', 'test-refreshToken');

  // Перехваты
  cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
  cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });

  cy.visit('http://localhost:4000');
});

afterEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});

describe('Тесты конструктора бургера', () => {
  it('Добавление ингредиента из списка в конструктор', () => {
    cy.get(selectors.constructorElement).should('not.exist');

    // Булка
    cy.get('[data-cy="ingredient-type-bun"]')
      .should('be.visible')
      .contains('Добавить')
      .click();
    cy.get('[data-cy="constructor-bun-1"]')
      .should('be.visible')
      .contains('верх')
      .should('exist');
    cy.get('[data-cy="constructor-bun-2"]')
      .should('be.visible')
      .contains('низ')
      .should('exist');

    // Начинка
    cy.get('[data-cy="ingredient-type-main"]').contains('Добавить').click();
    cy.get(selectors.constructorElement)
      .should('be.visible')
      .contains('Плоды')
      .should('exist');

    // Соус
    cy.get(selectors.constructorElement).contains('Соус').should('not.exist');
    cy.get('[data-cy="ingredient-type-sauce"]').contains('Добавить').click();
    cy.get(selectors.constructorElement)
      .should('be.visible')
      .contains('Соус фирменный')
      .should('exist');
  });

  it('Работа модальных окон', () => {
    cy.get(selectors.constructorElement).should('not.exist');

    // Открываем модальное окно с булкой
    cy.get('[data-cy="ingredient-type-bun"]')
      .contains('Краторная булка')
      .click();
    cy.get(selectors.modal)
      .should('be.visible')
      .contains('Краторная булка')
      .should('exist');

    // Закрываем через кнопку
    cy.get('[data-cy="modal-close"]').click();
    cy.get(selectors.modal).should('not.exist');

    // Открываем заново
    cy.get('[data-cy="ingredient-type-bun"]')
      .contains('Краторная булка')
      .click();
    cy.get(selectors.modal)
      .should('be.visible')
      .contains('Краторная булка')
      .should('exist');

    // Закрываем через overlay
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get(selectors.modal).should('not.exist');
  });

  it('Создание заказа', () => {
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    // Добавляем ингредиенты
    cy.get('[data-cy="ingredient-type-bun"]').contains('Добавить').click();
    cy.get('[data-cy="ingredient-type-main"]').contains('Добавить').click();
    cy.get('[data-cy="ingredient-type-sauce"]').contains('Добавить').click();

    // Запрос на создание заказа
    cy.get('[data-cy="order-button"]').click();

    // Проверка заказа
    cy.wait('@postOrder').its('response.statusCode').should('eq', 200);

    // Проверка модального окно с номером заказа
    cy.get(selectors.modal).should('be.visible');
    cy.get("[data-cy='orderNumber']").should('contain.text', '123');
    cy.get('[data-cy="modal-close"]').click();
    cy.get(selectors.modal).should('not.exist');

    // Проверка состояния после закрытия модального окна
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
