import { SimpleStringMap } from "../../utils";

const carregando = "div[loading]";

const labelCpfCnpj = "[for='input-document']";
const inputCpfCnpj = "#input-document";
const btnIdentificarCliente = ".is-full";
const btnIdentificar = "button[class='main-action qa-core-id-client-click']";
const infoAtendimento = ".attendance-info";
const btnEncerrarAtendimento = ".is-link";
const btnConfirmarEncerramento = ".qa-core-interrupt-service-yes-click";

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            verificaAtendimento(): Chainable<Element>,
			identificarCliente(cliente: SimpleStringMap): Chainable<Element>
        }
    }
}

Cypress.Commands.add("verificaAtendimento",
	() => {
		cy.get('span[class="cliente"]').then(function($cliente) {
			if($cliente.text().trim() != "Sem atendimento ativo") {
				cy.get(infoAtendimento).click();
				cy.get(btnEncerrarAtendimento).click();
				cy.get(btnConfirmarEncerramento).click();
			}
	   	})
		cy.get(carregando).should("not.exist");
	}
);

Cypress.Commands.add("identificarCliente",
	(cliente: SimpleStringMap) => {
		cy.get(infoAtendimento).click();
		cy.get(btnIdentificarCliente).click();
		
		cy.get(carregando).should("not.exist");

		cy.get(labelCpfCnpj).should("be.visible").click({timeout:30000,force:true});
		cy.get(inputCpfCnpj).should("be.visible").type(cliente.cpf);
		cy.get(btnIdentificar).click();
		cy.get(carregando).should("not.exist");
	}
);

export {};