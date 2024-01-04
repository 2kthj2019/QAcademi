// cypress/integration/createUser.spec.js

import { JsonRequest } from '../api/jsonRequest';
import { CreateUserResponse } from '../api/createUserResponse';

describe('Teste de API usando Cypress', () => {
  it('Criação de usuário (POST)', () => {
    const requestBody = new JsonRequest('John Doe', 'QA Engineer');

    cy.api({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      body: requestBody,
    }).then((response) => {
      // Validar Status Code
      expect(response.status).to.equal(201);

      // Validar campos específicos na resposta usando POJO
      const responseBody = new CreateUserResponse(response.body.id, response.body.createdAt);
      
      expect(responseBody.id).to.exist;
      expect(responseBody.createdAt).to.exist;
    });
  });
});
