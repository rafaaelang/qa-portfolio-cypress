import LoginPage from "../../pageObjects/LoginPage";
import ProductsPage from "../../pageObjects/ProductsPage";
import CartPage from "../../pageObjects/CartPage";
import CheckoutPage from "../../pageObjects/CheckoutPage";

describe("Checkout - SauceDemo", () => {
  let checkoutInfo;

  beforeEach(() => {
    cy.fixture("users").then((users) => {
      checkoutInfo = users.checkoutInfo;
      LoginPage.visit();
      LoginPage.login(users.validUser.username, users.validUser.password);
      ProductsPage.addFirstProductToCart();
      ProductsPage.goToCart();
      CartPage.goToCheckout();
    });
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
