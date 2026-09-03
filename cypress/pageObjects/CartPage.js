import { cartSelectors } from "../support/selectors/cartSelectors";

class CartPage {
  elements = {
    // Mantemos seletores de carrinho em arquivo dedicado para facilitar manutencao.
    cartItems: () => cy.get(cartSelectors.cartItems),
    removeButtons: () => cy.get(cartSelectors.removeButtons),
    checkoutButton: () => cy.get(cartSelectors.checkoutButton),
  };

  removeFirstItem() {
    this.elements.removeButtons().first().click();
  }

  goToCheckout() {
    this.elements.checkoutButton().click();
  }
}

export default new CartPage();
