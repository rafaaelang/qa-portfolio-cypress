import { loginSelectors } from "../support/selectors/loginSelectors";

class LoginPage {
  elements = {
    // Centralizar seletores evita manutencao espalhada quando o HTML muda.
    username: () => cy.get(loginSelectors.usernameInput),
    password: () => cy.get(loginSelectors.passwordInput),
    loginButton: () => cy.get(loginSelectors.submitButton),
    errorMessage: () => cy.get(loginSelectors.errorMessage),
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
