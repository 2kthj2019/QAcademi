/// <reference types="cypress" />

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            buscaGoogle(termoBusca: string, respostaDesejada: string): Chainable<Element>
        }
    }
}

Cypress.Commands.add(
	"buscaGoogle",
	(termoBusca, respostaDesejada) => {
        cy.intercept(`/complete/search?q=${termoBusca}&cp=*&client=*&xssi=*&hl=**authuser=*`,
            (envio) => {
                envio.continue((resposta) => {
                    resposta.body = respostaDesejada;
                })
            }
        ).as("BuscaSugestao");

		cy.get("textarea[name='q']").as("searchBar");
		cy.get("@searchBar").click().type(termoBusca).should("have.value", termoBusca).type("{enter}");
	}
);

export {};