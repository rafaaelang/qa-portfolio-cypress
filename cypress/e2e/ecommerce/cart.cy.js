import LoginPage from "../../pageObjects/LoginPage";
import ProductsPage from "../../pageObjects/ProductsPage";
import CartPage from "../../pageObjects/CartPage";

describe("Produtos e Carrinho - SauceDemo", () => {
  let users;

  before(() => {
    // Fixture em before evita recarregar o mesmo JSON a cada teste.
    cy.fixture("users").then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login(users.validUser.username, users.validUser.password);
  });

  it("deve ordenar produtos por preço (menor para maior)", () => {
    ProductsPage.sortBy("lohi");
    ProductsPage.elements.productPrices().then(($prices) => {
      const values = [...$prices].map((el) =>
        parseFloat(el.innerText.replace("$", ""))
      );
      const sorted = [...values].sort((a, b) => a - b);
      expect(values).to.deep.equal(sorted);
    });
  });

  it("deve adicionar um produto ao carrinho e atualizar o contador", () => {
    ProductsPage.addFirstProductToCart();
    ProductsPage.elements.cartBadge().should("have.text", "1");
  });

  it("deve remover um produto do carrinho", () => {
    ProductsPage.addFirstProductToCart();
    ProductsPage.goToCart();
    CartPage.removeFirstItem();
    CartPage.elements.cartItems().should("have.length", 0);
  });
});
