describe("API - Usuários (JSONPlaceholder)", () => {
  const apiUrl = Cypress.env("apiUrl");

  it("GET /users - deve listar usuários com status 200 e schema válido", () => {
    cy.request(`${apiUrl}/users`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      const firstUser = response.body[0];
      expect(firstUser).to.have.all.keys(
        "id",
        "name",
        "username",
        "email",
        "address",
        "phone",
        "website",
        "company"
      );
    });
  });

  it("GET /users/:id - deve retornar um usuário existente", () => {
    cy.request(`${apiUrl}/users/2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(2);
      expect(response.body.email).to.include("@");
    });
  });

  it("GET /users/:id - deve retornar 404 para usuário inexistente", () => {
    cy.request({
      url: `${apiUrl}/users/9999`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it("POST /users - deve criar um novo usuário", () => {
    const payload = { name: "João Teste", username: "joaoteste", email: "joao@teste.com" };
    cy.request("POST", `${apiUrl}/users`, payload).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq(payload.name);
      expect(response.body.email).to.eq(payload.email);
      expect(response.body).to.have.property("id");
    });
  });

  it("PUT /users/:id - deve atualizar um usuário existente", () => {
    const payload = { name: "João Teste Atualizado", email: "joao.atualizado@teste.com" };
    cy.request("PUT", `${apiUrl}/users/2`, payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(payload.name);
      expect(response.body.email).to.eq(payload.email);
    });
  });

  it("DELETE /users/:id - deve remover um usuário e retornar 200", () => {
    cy.request("DELETE", `${apiUrl}/users/2`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("deve responder em menos de 1 segundo (validação de performance básica)", () => {
    cy.request(`${apiUrl}/users`).then((response) => {
      expect(response.duration).to.be.lessThan(1000);
    });
  });
});