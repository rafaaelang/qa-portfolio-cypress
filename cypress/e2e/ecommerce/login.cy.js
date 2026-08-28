import LoginPage from "../../pageObjects/LoginPage";

describe("Login - SauceDemo", () => {
  let users;

  before(() => {
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
    cy.get(".title").should("contain.text", "Products");
  });

  it("deve bloquear usuário marcado como locked_out_user", () => {
    LoginPage.login(users.lockedUser.username, users.lockedUser.password);
    LoginPage.getErrorMessage().should(
      "contain.text",
      "Sorry, this user has been locked out"
    );
  });

  it("deve exibir erro para credenciais inválidas", () => {
    LoginPage.login("usuario_invalido", "senha_errada");
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
});
