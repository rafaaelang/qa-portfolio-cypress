import LoginPage from "../../pageObjects/LoginPage";
import ProductsPage from "../../pageObjects/ProductsPage";

describe("Login - SauceDemo", () => {
  let users;

  before(() => {
    // Carregamos fixture uma vez para reduzir custo e manter os cenarios deterministas.
    cy.fixture("users").then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    LoginPage.visit();
  });

  it("deve logar com sucesso usando credenciais válidas", () => {
    LoginPage.login(users.validUser.username, users.validUser.password);
    cy.url().should("include", "/inventory.html");
    ProductsPage.elements.pageTitle().should("contain.text", "Products");
  });

  it("deve bloquear usuário marcado como locked_out_user", () => {
    LoginPage.login(users.lockedUser.username, users.lockedUser.password);
    LoginPage.getErrorMessage().should(
      "contain.text",
      "Sorry, this user has been locked out"
    );
  });

  it("deve exibir erro para credenciais inválidas", () => {
    LoginPage.login(users.invalidUser.username, users.invalidUser.password);
    LoginPage.getErrorMessage().should(
      "contain.text",
      "Username and password do not match"
    );
  });

  it("deve exibir erro ao tentar logar sem preencher os campos", () => {
    LoginPage.submit();
    LoginPage.getErrorMessage().should(
      "contain.text",
      "Username is required"
    );
  });

  it("deve exibir erro para usuarios invalidos do dataset", () => {
    // Dataset facilita expandir cenarios sem duplicar estrutura de teste.
    users.edgeCaseCredentials.forEach(({ username, password, expectedMessage }) => {
      LoginPage.login(username, password);
      LoginPage.getErrorMessage().should("contain.text", expectedMessage);
    });
  });
});
