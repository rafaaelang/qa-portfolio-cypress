import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../../pageObjects/LoginPage";
import ProductsPage from "../../../pageObjects/ProductsPage";

Given("que estou na página de login", () => {
  LoginPage.visit();
});

When("eu preencho o usuário {string} e a senha {string}", (usuario, senha) => {
  LoginPage.fillUsername(usuario);
  LoginPage.fillPassword(senha);
});

When("eu clico no botão de login", () => {
  LoginPage.submit();
});

Then("eu devo ser redirecionado para a página de produtos", () => {
  cy.url().should("include", "/inventory.html");
  // Reutilizamos o Page Object para manter o mesmo ponto de manutencao dos seletores.
  ProductsPage.elements.pageTitle().should("contain.text", "Products");
});

Then("eu devo ver a mensagem de erro {string}", (mensagemEsperada) => {
  LoginPage.getErrorMessage().should("contain.text", mensagemEsperada);
});
