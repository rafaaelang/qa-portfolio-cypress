# language: pt
Funcionalidade: Login no SauceDemo
  Como usuário do sistema
  Eu quero fazer login com minhas credenciais
  Para acessar o catálogo de produtos

  Contexto:
    Dado que estou na página de login

  Cenário: Login com credenciais válidas
    Quando eu preencho o usuário "standard_user" e a senha "secret_sauce"
    E eu clico no botão de login
    Então eu devo ser redirecionado para a página de produtos

  Cenário: Login com usuário bloqueado
    Quando eu preencho o usuário "locked_out_user" e a senha "secret_sauce"
    E eu clico no botão de login
    Então eu devo ver a mensagem de erro "Sorry, this user has been locked out"

  Cenário: Login com credenciais inválidas
    Quando eu preencho o usuário "usuario_invalido" e a senha "senha_errada"
    E eu clico no botão de login
    Então eu devo ver a mensagem de erro "Username and password do not match"

  Esquema do Cenário: Login bloqueado com múltiplos usuários inválidos
    Quando eu preencho o usuário "<usuario>" e a senha "<senha>"
    E eu clico no botão de login
    Então eu devo ver a mensagem de erro "<mensagem>"

    Exemplos:
      | usuario                  | senha        | mensagem                            |
      | problem_user             | senha_errada | Username and password do not match  |
      | performance_glitch_user  | senha_errada | Username and password do not match  |
