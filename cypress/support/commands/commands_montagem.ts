/// <reference types="cypress" />

import { SimpleStringMap } from "../../utils";

// Add Serviço de Montagem
const servicoMontagem = "section[class='card servico-montagem']";

// Add Mercadoria no Carrinho
const btnAddCarrinho = ".qa-catalog-description-footer-addcart-button-click";

// Add Campanha ou Combo
const cardComboCampanha = ".card-info";
const selectComboCampanha = "section[class='accordion accordion-services'] > header > button";
const itemComboIni = "input[id='serviceDetail-combos-";
const itemCampanhaIni = "input[id='serviceDetail-campanhas-";
const itemComboCampanhaFim = "-1']";
const btnFinalizar = ".action-group > .main-action";

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            addServicoMontagemSimples(): Chainable<Element>,
			addServicoMontagemConjunto(): Chainable<Element>,
			addCombo(mercadoria: SimpleStringMap): Chainable<Element>,
			addCampanha(mercadoria: SimpleStringMap): Chainable<Element>,
			addCarrinho(mercadoria: SimpleStringMap): Chainable<Element>,
        }
    }
}

Cypress.Commands.add("addServicoMontagemSimples",
	() => {
		cy.get(servicoMontagem).should('exist');
		cy.get(servicoMontagem).should('be.visible').scrollIntoView().click();
		cy.get(btnAddCarrinho).click();
	}
);

Cypress.Commands.add("addServicoMontagemConjunto",
	() => {
		cy.get(servicoMontagem).should('exist');
		cy.get(servicoMontagem).should('be.visible').scrollIntoView().click();
		cy.get(btnAddCarrinho).click();
		
		cy.get('.action-group > .main-action').should('be.visible').click();
	}
);

Cypress.Commands.add("addCombo",
	(mercadoria: SimpleStringMap) => {
		cy.get(cardComboCampanha).should('exist');
		cy.get(cardComboCampanha).should('be.visible').scrollIntoView().click();

		if(mercadoria.selectCombo.ativo == "sim") {
			cy.get(selectComboCampanha).should('contain', 'combos').should('exist');
			cy.get(selectComboCampanha).should('contain', 'combos').then(function($combo: JQuery<HTMLElement>) {
				$combo.trigger("click");
			})
			cy.get(itemComboIni + mercadoria.selectCombo.numero + itemComboCampanhaFim).should('exist').click({force: true});
			cy.get(btnFinalizar).click();
		}
	}
);

Cypress.Commands.add("addCampanha",
	(mercadoria: SimpleStringMap) => {
		cy.get(cardComboCampanha).should('exist');
		cy.get(cardComboCampanha).should('be.visible').scrollIntoView().click();

		if(mercadoria.selectCampanha == "sim") {
			cy.get(selectComboCampanha).should('contain', 'campanhas').should('exist');
			cy.get(selectComboCampanha).should('contain', 'campanhas').then(function($campanha: JQuery<HTMLElement>) {
				$campanha.trigger("click");
			})
			cy.get(itemComboIni + mercadoria.selectCampanha.numero + itemComboCampanhaFim).should('exist').click({force: true});
			cy.get(btnFinalizar).click();
		}
	}
);

Cypress.Commands.add("addCarrinho",
	(mercadoria: SimpleStringMap) => {
		cy.get(btnAddCarrinho).click();
		if(mercadoria.conjunto == "sim") {
			cy.get('.action-group > .main-action').should('be.visible').click();
		}
	}
);

export {};