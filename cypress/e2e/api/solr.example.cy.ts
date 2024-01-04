import { ResourceOptions } from 'solr-client';

const solrQueries = require(`../../fixtures/${Cypress.env('estagioDev')}/solr_queries`);
const solrConn = require(`../../fixtures/${Cypress.env('estagioDev')}/solr_conexao`);

describe('Solr Test', () => {
  before(() => {
    cy.task('solrStart', solrConn.solrOptions);
  });
  
  it('solr - searches Solr', () => {    
    cy.task('solrSearch', solrQueries.testQuery).then((result) => {
      cy.task('log', (result as any).response.docs);
    });
  });
});