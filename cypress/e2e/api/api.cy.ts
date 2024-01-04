

describe('Teste de API usando Cypress', () => {
  it('Criação de usuário (POST)', () => {
    cy.api({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      body: {
        name: 'John Doe',
        job: 'QA Engineer'
      }
    }).then((response) => {
      // Validar Status Code
      expect(response.status).to.equal(201);

      // Validar campos específicos na resposta
      expect(response.body.name).to.equal('John Doe');
      expect(response.body.job).to.equal('QA Engineer');

      // Validar campos obrigatórios na resposta
      expect(response.body.id).to.not.be.null;
      expect(response.body.createdAt).to.not.be.null;
    });
  });
});

// cypress/integration/createUser.spec.js

import Ajv from 'ajv';

describe('Teste de API usando Cypress', () => {
  it('Criação de usuário (POST)', () => {
    cy.api({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      body: {
        name: 'John Doe',
        job: 'QA Engineer'
      }
    }).then((response) => {
      // Validar Status Code
      expect(response.status).to.equal(201);

      // Validar campos específicos na resposta
      expect(response.body.name).to.equal('John Doe');
      expect(response.body.job).to.equal('QA Engineer');

      // Validar campos obrigatórios na resposta
      expect(response.body.id).to.exist;
      expect(response.body.createdAt).to.exist;

      // Validar contrato usando JSON Schema
      const jsonSchema = {
        type: 'object',
        properties: {
          name: { type: 'string' },
          job: { type: 'string' },
          id: { type: 'string' },
          createdAt: { type: 'string' }
        },
        required: ['name', 'job', 'id', 'createdAt'],
      };

      const ajv = new Ajv();
      const validate = ajv.compile(jsonSchema);
      const isValid = validate(response.body);

      // Assegurar que o JSON da resposta está em conformidade com o schema definido
      expect(isValid).to.be.true;
    });
  });
});




