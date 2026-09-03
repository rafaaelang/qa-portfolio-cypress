export const buildApiUser = (overrides = {}) => {
  const timestamp = Date.now();

  return {
    // Geramos valores unicos para evitar colisao de dados entre execucoes.
    name: `Usuario Teste ${timestamp}`,
    username: `usuario_teste_${timestamp}`,
    email: `usuario.${timestamp}@teste.com`,
    ...overrides,
  };
};
