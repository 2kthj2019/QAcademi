const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const grepTags = require('@cypress/grep/src/plugin');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on: any, config: any) => {
    grepTags(config);
    allureWriter(on, config);
    return config;
}