const dadosJira = require(`../../fixtures/${Cypress.env('estagioDev')}/jira`).default;

context('Zephyr Scale Server', () => {
	describe('API Interaction', () => {
		it("@zephyr - Write to Zephyr", () => {
			cy.task('testZephyrIntegration', dadosJira);
		});
	});
});