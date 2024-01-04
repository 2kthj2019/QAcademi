// cypress/integration/api_test.spec.js

describe('API Test with Cypress', () => {
    it('Create a new user via API', () => {
      const user = {
        name: 'John Doe',
        job: 'QA Engineer'
      };
  
      // Chamada da API usando a função criada
      cy.createUser(user).then((response) => {
        // Validação usando a função criada
        cy.validateCreateUser(response, user);
      });
    });
  });
  