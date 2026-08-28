class LoginPage {
  elements = {
    username: () => cy.get("#user-name"),
    password: () => cy.get("#password"),
    loginButton: () => cy.get("#login-button"),
    errorMessage: () => cy.get('[data-test="error"]'),
  };

  visit() {
    cy.visit("/");
  }

  fillUsername(value) {
    this.elements.username().clear().type(value);
  }

  fillPassword(value) {
    this.elements.password().clear().type(value);
  }

  submit() {
    this.elements.loginButton().click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }

  getErrorMessage() {
    return this.elements.errorMessage();
  }
}

export default new LoginPage();
