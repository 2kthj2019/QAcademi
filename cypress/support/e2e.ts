import './commands/base_commands';
import './commands/overridden_commands';
import 'cypress-plugin-api'

require('./commands/commands_carrinho');
require('./commands/commands_cliente');
require('./commands/commands_login');
require('./commands/commands_mercadoria');
require('./commands/commands_montagem');
require('./commands/commands');



import '@shelex/cypress-allure-plugin';

const registerCypressGrep = require('@cypress/grep');
registerCypressGrep();

Cypress.SelectorPlayground.defaults({
    selectorPriority: ['data-test', 'data-testid', 'id', 'class', 'attributes', 'tag', 'nth-child']
});

/* 
Se exceções não tratadas pela aplicação estiverem atrapalhando a execução
dos testes, utilize o hook de evento abaixo para deliberadamente ignorá-las. 

Cypress.on('uncaught:exception', (err, runnable) => {
    console.log(err)
    return false;
});
*/
