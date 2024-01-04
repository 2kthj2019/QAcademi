import { SimpleStringMap } from 'cypress/support/utils';

const mongoConn = require(`../../fixtures/${Cypress.env('estagioDev')}/mongo_conexao`);

describe('MongoDB tasks', () => {
  before(() => {
    cy.task('mongoStart', {
      uri: mongoConn.uri,
      dbName: mongoConn.databaseName,
      clientOpts: mongoConn.connData
    });
  });

  after(() => {
    cy.task('mongoStop');
  });

  it('mongo - Selecionar qualquer SKU das filiais 1000, 1200 e 1500', () => {
    const collectionName = 'estoque-nova-sync';
    const query: SimpleStringMap = {
      $and: [
        {
          "_id.filial": {
            $in: [1000, 1200, 1500]
          }
        }
      ]
    };
    
    cy.task('mongoReadSingle', {
      query,
      collectionName,
      dbName: "catalogo"
    }).then((result) => {
      cy.task('log', result);
    });
  });
});