describe("API - Autenticacao real (ReqRes)", () => {
  const authApiUrl = Cypress.env("authApiUrl");

  it("POST /login - deve autenticar com credenciais validas", () => {
    // Este teste valida contrato real de autenticacao sem uso de mock.
    cy.request("POST", `${authApiUrl}/login`, {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
    });
  });

  it("POST /login - deve retornar erro quando senha nao e enviada", () => {
    cy.request({
      method: "POST",
      url: `${authApiUrl}/login`,
      failOnStatusCode: false,
      body: {
        email: "peter@klaven",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq("Missing password");
    });
  });
});
