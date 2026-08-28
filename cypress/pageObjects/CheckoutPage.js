class CheckoutPage {
  elements = {
    firstName: () => cy.get('[data-test="firstName"]'),
    lastName: () => cy.get('[data-test="lastName"]'),
    postalCode: () => cy.get('[data-test="postalCode"]'),
    continueButton: () => cy.get('[data-test="continue"]'),
    finishButton: () => cy.get('[data-test="finish"]'),
    errorMessage: () => cy.get('[data-test="error"]'),
    completeHeader: () => cy.get(".complete-header"),
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
