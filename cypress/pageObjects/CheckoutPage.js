import { checkoutSelectors } from "../support/selectors/checkoutSelectors";

class CheckoutPage {
  elements = {
    // Centralizacao de seletores reduz acoplamento e facilita evolucao dos testes.
    firstName: () => cy.get(checkoutSelectors.firstNameInput),
    lastName: () => cy.get(checkoutSelectors.lastNameInput),
    postalCode: () => cy.get(checkoutSelectors.postalCodeInput),
    continueButton: () => cy.get(checkoutSelectors.continueButton),
    finishButton: () => cy.get(checkoutSelectors.finishButton),
    errorMessage: () => cy.get(checkoutSelectors.errorMessage),
    completeHeader: () => cy.get(checkoutSelectors.completeHeader),
  };

  fillInfo({ firstName, lastName, postalCode }) {
    this.elements.firstName().type(firstName);
    this.elements.lastName().type(lastName);
    this.elements.postalCode().type(postalCode);
  }

  continue() {
    this.elements.continueButton().click();
  }

  finish() {
    this.elements.finishButton().click();
  }
}

export default new CheckoutPage();
