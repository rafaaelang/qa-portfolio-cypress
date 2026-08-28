class CartPage {
  elements = {
    cartItems: () => cy.get(".cart_item"),
    removeButtons: () => cy.get('button[id^="remove"]'),
    checkoutButton: () => cy.get('[data-test="checkout"]'),
  };

  removeFirstItem() {
    this.elements.removeButtons().first().click();
  }

  goToCheckout() {
    this.elements.checkoutButton().click();
  }
}

export default new CartPage();
