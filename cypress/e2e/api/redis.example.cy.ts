const chavesRedis = require(`../../fixtures/${Cypress.env('estagioDev')}/redis_chaves`).default;
const conexaoRedis = require(`../../fixtures/${Cypress.env('estagioDev')}/redis_conexao`).default;

describe('Redis Test', () => {
  before(() => {
    cy.task('connectRedis', conexaoRedis);
  });

  after(() => {
    cy.task('disconnectRedis');
  });

  it('redis - Acessar o REDIS do Via Mais e verificar que o Resiliência está desligado', { tags: '@X29' }, () => {
    let valor_opcao_vv_adm: unknown;
    let valor_flag_vv_autorizacao: unknown;

    cy.task('redisGet', chavesRedis.opcao_vv_adm).then((value) => {
      valor_opcao_vv_adm = value;
    });

    cy.task('redisGet', chavesRedis.flag_vv_autorizacao).then((value) => {
      valor_flag_vv_autorizacao = value;
    });

    cy.then(() => { 
      expect(valor_opcao_vv_adm).to.contain('false');
      expect(valor_flag_vv_autorizacao).to.contain('valuexp');
    });
  });
});