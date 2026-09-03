import LoginPage from "../../pageObjects/LoginPage";
import ProductsPage from "../../pageObjects/ProductsPage";
import CartPage from "../../pageObjects/CartPage";
import CheckoutPage from "../../pageObjects/CheckoutPage";

describe("Checkout - SauceDemo", () => {
  let users;
  let checkoutInfo;

  before(() => {
    // Guardamos os dados em memoria para deixar o beforeEach focado no fluxo do teste.
    cy.fixture("users").then((data) => {
      users = data;
      checkoutInfo = data.checkoutInfo;
    });
  });

  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login(users.validUser.username, users.validUser.password);
    ProductsPage.addFirstProductToCart();
    ProductsPage.goToCart();
    CartPage.goToCheckout();
  });

  it("deve completar o checkout com dados válidos", () => {
    CheckoutPage.fillInfo(checkoutInfo);
    CheckoutPage.continue();
    CheckoutPage.finish();
    CheckoutPage.elements.completeHeader().should(
      "contain.text",
      "Thank you for your order!"
    );
  });

  it("deve exibir erro ao tentar continuar sem preencher os campos obrigatórios", () => {
    CheckoutPage.continue();
    CheckoutPage.elements.errorMessage().should(
      "contain.text",
      "First Name is required"
    );
  });
});
