# QA Portfolio – Cypress (E2E + API)

Portfólio técnico de automação de testes, desenvolvido para demonstrar competências de QA pleno/sênior: testes end-to-end de interface, testes de API REST, organização com Page Object Model e integração contínua.

## 🎯 Objetivo

Simular um cenário real de e-commerce (login, catálogo, carrinho, checkout) e uma API pública REST, aplicando boas práticas de automação de testes.

## 🛠️ Stack

- **Cypress** – framework de automação E2E e API
- **JavaScript**
- **Cucumber/Gherkin** – cenários BDD em linguagem natural
- **cypress-mochawesome-reporter** – relatório HTML de execução com screenshots
- **GitHub Actions** – pipeline de CI

## 📂 Estrutura

```
cypress/
├── e2e/
│   ├── ecommerce/        # Testes E2E de interface (SauceDemo)
│   │   ├── login.cy.js
│   │   ├── cart.cy.js
│   │   └── checkout.cy.js
│   ├── api/              # Testes de API (ReqRes)
│   │   ├── users.cy.js
│   │   └── auth.cy.js
│   └── bdd/               # Cenários BDD em Gherkin
│       ├── login.feature
│       └── step_definitions/
│           └── login.steps.js
├── pageObjects/           # Page Object Model
├── fixtures/               # Massa de dados de teste
├── reports/                 # Relatório HTML gerado (não versionado)
└── support/                 # Comandos customizados
```

## ✅ Cobertura de testes

**E2E (SauceDemo – site público de prática de QA)**
- Login: sucesso, usuário bloqueado, credenciais inválidas, campos vazios
- Catálogo: ordenação de produtos por preço
- Carrinho: adicionar e remover produtos
- Checkout: fluxo completo e validação de campos obrigatórios

**API (ReqRes – API REST pública de testes)**
- CRUD completo de usuários (GET, POST, PUT, DELETE)
- Validação de status code e schema de resposta
- Cenários de erro (404, 400)
- Validação básica de tempo de resposta

## ▶️ Como rodar o projeto

```bash
# instalar dependências
npm install

# abrir o Cypress em modo interativo
npm run cy:open

# rodar todos os testes em modo headless
npm run cy:run

# rodar só os testes de API
npm run cy:run:api

# rodar só os testes E2E
npm run cy:run:e2e

# rodar só os cenários BDD (Gherkin)
npm run cy:run:bdd
```

## 📊 Relatório de execução

Rode o comando abaixo para executar todos os testes e gerar automaticamente um relatório HTML consolidado (com gráfico de resultados e detalhes de cada teste):

```bash
npm run report
```

Depois, para abrir o relatório no navegador:

```bash
npm run report:open
```

O relatório fica salvo em `cypress/reports/html/report.html`.

## 🥒 BDD com Gherkin

O cenário de login também está descrito em linguagem natural (`cypress/e2e/bdd/login.feature`), no formato Given/When/Then, com os step definitions correspondentes implementados reutilizando o mesmo Page Object dos testes E2E. Isso demonstra a tradução de requisitos de negócio em testes automatizados — prática comum em times que trabalham com BDD.

## 🔄 Integração Contínua

O projeto roda automaticamente via GitHub Actions a cada push/PR na branch `main` (ver `.github/workflows/cypress.yml`).

## 👤 Autor

Analista de QA RafaeL Ângelo — portfólio de automação de testes.
