import { SimpleStringMap } from "../../utils";

const labelCampoFilial = "label[for='filial']";
const inputCampoFilial = "input[id='filial']";
const labelNomeFilial = "span.app-login-filial";
const labelCampoEmpresa = "label[for='empresa']";
const inputCampoEmpresa = "input[id='empresa']";
const labelCampoMatricula = "label[for='matricula']";
const inputCampoMatricula = "input[id='matricula']";
const labelCampoSenha = "label[for='senha']";
const inputCampoSenha = "input[id='senha']";
const botaoLogin = "button.qa-home-access-button-click";
const carregando = ".qa-core-loading-panel-read";

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            login(usuario: SimpleStringMap): Chainable<Element>
        }
    }
}

Cypress.Commands.add(
	"login",
	(usuario: SimpleStringMap) => {

        cy.get(labelCampoFilial).should("be.visible").click();
        cy.get(inputCampoFilial).should("be.focused").type(usuario.filial).should("have.value", usuario.filial);

        cy.get(labelCampoEmpresa).click();
		cy.get(labelNomeFilial).should("exist");

        cy.get(labelCampoEmpresa).click();
		cy.get(inputCampoEmpresa).type(usuario.empresa).should("have.value", usuario.empresa);

        cy.get(labelCampoMatricula).click();
		cy.get(inputCampoMatricula).type(usuario.matricula).should("have.value", usuario.matricula);

        cy.get(labelCampoSenha).click();
		cy.get(inputCampoSenha).type(usuario.senha).should("have.value", usuario.senha);
		cy.get(botaoLogin).click();

        cy.get(carregando).should("not.exist");
		cy.url().should('contain', '/catalogo/#/vitrine?filtros=EM_LINHA');
	}
);

export {};