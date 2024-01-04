const db2Conn = require(`../../fixtures/${Cypress.env('estagioDev')}/db2_conexao`);

describe('DB2 Test', () => {
  const connDeets = db2Conn.connectionDetails;
  const connOpts = db2Conn.connectionOptions;

  before (() => {
    cy.task('db2Open', { connectionDetails: connDeets, connectionOptions: connOpts });
  });

  const queryBranchStockCount = (branch: number, tableName: string, table_prefix: string, columnSelector: string = '*', limiter: number = 10): string => {
    return `SELECT ${columnSelector} FROM ${table_prefix}.${tableName} WHERE CD_FIL IN (${branch}) FETCH FIRST ${limiter} ROWS ONLY`;
  }

  after (() => {
    cy.task('db2Close');
  });

  it.only('db2 - Verifica que código da filial está correto no DB2', () => {
    let results: Array<{[k: string]: any}>;

    const filial = 1000;

    cy.task('db2Query', queryBranchStockCount(filial, 'ETQ_MCR_CNT_FIL', connDeets.QUERY_PREFIX, '*', 10)).then((result) => {
        results = result as Array<{[k: string]: any}>;
    });

    cy.then((subj) => {
      expect(results[1].CD_FIL).to.equal(filial);
    })
  });
});