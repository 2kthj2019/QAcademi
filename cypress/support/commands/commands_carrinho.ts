const carregando = "div[loading]";

// Editar Carrinho
const divDetalheProduto = ".detalhes-produto";
const btnEditarMercadoria = ".qa-cart-edit-item-click";

// Aba Endereço de Entrega
const selectEndereco = "#seleciona-endereco-entrega";
const labelTelefone = "[for='inputTelefoneObrigatorio']";
const inputTelefone = "#inputTelefoneObrigatorio";

// Aba Serviço
const abaServico = ".qa-cart-edit-services-tab-click";
const selectEndServico = "#select-01";
const btnFinalizar = "#qa-cart-cd-data-confirm-click";

// Forma Pagamento
const tituloFormaPagamento = "div[class='formas-pagamento']";
const labelDinheiro = ".qa-core-filters-click";
const labelPreencherValorDinheiro = ".qa-cart-payment-cash-fill-remaining-value-click";
const btnConfirmaDinheiro = ".qa-cart-payment-cash-submit-click";
const labelRestantePagar = ".qa-cart-payment-footer-delivery-cart-remaining-value-read";

// Finalizar Pedido
const btnGerarPedido = ".qa-cart-payment-footer-delivery-cart-submit-payment-click";

// Detalhe do Pedido
const tituloDetalhePedido = ".titulo-resumo";
const selectImpressora = "#select-impressora";

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            editarInfoCarrinho(): Chainable<Element>,
			addEnderecoEntrega(): Chainable<Element>,
			addRetiraLoja(): Chainable<Element>,
			addServicoCampanhaComboMontagem(): Chainable<Element>,
			addPgtoDinheiro(): Chainable<Element>,
			finalizarPedido(): Chainable<Element>,
			validarVenda(): Chainable<Element>
        }
    }
}

Cypress.Commands.add("editarInfoCarrinho",
	() => {
		cy.url().should('contain', 'carrinho/#/');
		cy.wait(1000);
		cy.get(divDetalheProduto).should('be.visible');
		cy.get(btnEditarMercadoria).should('be.visible').click();
		cy.get(carregando).should("not.exist");
	}
);

Cypress.Commands.add("addEnderecoEntrega",
	() => {
		cy.get(selectEndereco).select(1);
		cy.wait(1000);
		cy.get(labelTelefone).should('be.visible').click();
		cy.get(inputTelefone).should('be.focused').type('21993416332');
		cy.get(abaServico).click();
		cy.get('#select-01').scrollIntoView().should('be.visible').select(1);
		cy.get('#qa-cart-cd-data-confirm-click').click();
		
		cy.get(carregando).should("not.exist");
	}
);

Cypress.Commands.add("addRetiraLoja",
	() => {
		cy.get(selectEndereco).select('Retira nesta loja');
		cy.wait(1000);
	}
);

Cypress.Commands.add("addServicoCampanhaComboMontagem",
	() => {
		cy.get(abaServico).click();
		cy.get(selectEndServico).scrollIntoView().should('be.visible').select(1);
		cy.get(btnFinalizar).click();
		cy.get(carregando).should("not.exist");
	}
);

Cypress.Commands.add("addPgtoDinheiro",
	() => {
		cy.get(tituloFormaPagamento).should('be.visible');
		cy.get(labelDinheiro).contains(' Dinheiro ').click();

		cy.get(carregando).should("not.exist");

		cy.get(btnConfirmaDinheiro).should("be.visible").should("have.attr", "disabled");
		cy.wait(1000);
		cy.get(labelPreencherValorDinheiro).should('be.visible').click();
		cy.wait(1000);
		cy.get(carregando).should("not.exist");

		cy.get(labelPreencherValorDinheiro).should("be.visible").should("have.attr", "disabled");
		cy.get(labelRestantePagar).should("contain", "R$ 0,00");
		cy.get(btnConfirmaDinheiro).should("be.visible").should("not.have.attr", "disabled");
		cy.get(btnConfirmaDinheiro).click();
	}
);

Cypress.Commands.add("finalizarPedido",
	() => {
		cy.get(carregando).should("not.exist");
		cy.wait(1000);
		cy.get(btnGerarPedido).should('be.visible').click();
	}
);

Cypress.Commands.add("validarVenda",
	() => {
		cy.url().should('contain', '/carrinho/#/resumo-compra');
		cy.get(carregando).should("not.exist");

		cy.get(tituloDetalhePedido).should('be.visible');
		cy.get(tituloDetalhePedido).should('contain', 'Detalhes do pedido');
		cy.get(selectImpressora).should('be.visible').select('43');
		cy.get('.main-action').should('be.visible').click();
	}
);

export {};