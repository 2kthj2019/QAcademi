// cypress/support/commands.js

Cypress.Commands.add('createUser', (user) => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      body: user
    }).then((response) => {
      cy.wrap(response);
    });
  });
  
  Cypress.Commands.add('validateCreateUser', (response, expectedUser) => {
    expect(response.status).to.equal(201);
    expect(response.body.name).to.equal(expectedUser.name);
    expect(response.body.job).to.equal(expectedUser.job);
  });