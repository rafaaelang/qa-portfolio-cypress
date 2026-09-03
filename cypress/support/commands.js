import LoginPage from "../pageObjects/LoginPage";

// O comando reaproveita o Page Object para manter uma unica fonte de verdade do login.
Cypress.Commands.add("login", (username, password) => {
  LoginPage.visit();
  LoginPage.login(username, password);
});
