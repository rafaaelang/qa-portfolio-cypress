class ProductsPage {
  elements = {
    pageTitle: () => cy.get(".title"),
    sortDropdown: () => cy.get(".product_sort_container"),
    productNames: () => cy.get(".inventory_item_name"),
    productPrices: () => cy.get(".inventory_item_price"),
    addToCartButtons: () => cy.get('button[id^="add-to-cart"]'),
    cartBadge: () => cy.get(".shopping_cart_badge"),
    cartIcon: () => cy.get(".shopping_cart_link"),
  };

  sortBy(optionValue) {
    this.elements.sortDropdown().select(optionValue);
  }

  addFirstProductToCart() {
    this.elements.addToCartButtons().first().click();
  }

  goToCart() {
    this.elements.cartIcon().click();
  }
}

export default new ProductsPage();
