import { productsSelectors } from "../support/selectors/productsSelectors";

class ProductsPage {
  elements = {
    // O mesmo mapa de seletores e usado por todos os fluxos de produto/carrinho.
    pageTitle: () => cy.get(productsSelectors.pageTitle),
    sortDropdown: () => cy.get(productsSelectors.sortDropdown),
    productNames: () => cy.get(productsSelectors.productNames),
    productPrices: () => cy.get(productsSelectors.productPrices),
    addToCartButtons: () => cy.get(productsSelectors.addToCartButtons),
    cartBadge: () => cy.get(productsSelectors.cartBadge),
    cartIcon: () => cy.get(productsSelectors.cartIcon),
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
