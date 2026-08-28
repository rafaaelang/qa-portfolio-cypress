describe("API - Autenticação (mock via cy.intercept)", () => {
  const apiUrl = Cypress.env("apiUrl");

  beforeEach(() => {
    // visita uma página para termos um contexto de navegador,
    // necessário para o cy.intercept capturar a requisição
    cy.visit("/");
  });

  it("POST /login - deve autenticar com sucesso e retornar um token (resposta simulada)", () => {
    cy.intercept("POST", `${apiUrl}/login`, {
      statusCode: 200,
      body: { token: "token-simulado-abc123" },
    }).as("loginSuccess");

    cy.window().then((win) => {
      win
        .fetch(`${apiUrl}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "usuario@teste.com", password: "senha123" }),
        })
        .then((res) => res.json());
    });

    cy.wait("@loginSuccess").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property("token");
    });
  });

  it("POST /login - deve retornar 400 quando a senha não é enviada (resposta simulada)", () => {
    cy.intercept("POST", `${apiUrl}/login`, {
      statusCode: 400,
      body: { error: "Missing password" },
    }).as("loginError");

    cy.window().then((win) => {
      win
        .fetch(`${apiUrl}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "usuario@teste.com" }),
        })
        .then((res) => res.json());
    });

    cy.wait("@loginError").then((interception) => {
      expect(interception.response.statusCode).to.eq(400);
      expect(interception.response.body.error).to.eq("Missing password");
    });
  });
});