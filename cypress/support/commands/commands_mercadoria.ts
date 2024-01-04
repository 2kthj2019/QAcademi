import { SimpleStringMap } from "../../utils";

const carregando = "div[loading]";

// Buscar Mercadoria
const inputSku = ".qa-core-product-search-write";
const btnBuscarSku = ".qa-core-search-for-products-click";
const txtValorMercadoria = ".qa-catalog-description-final-price-read";
const txtValorServico = ".service-values > .price";
const skuNaoEncontrado = ".qa-catalog-description-unknown-merchandise-title-read";

// Estoque
const labelEstoque = ".alterar-estado";
const btnEstoqueVoltar = ".qa-core-item-stock-previous-option-click > .icon";
const qtdItemEstoque = ".qa-core-store-stock-quantity-read";

// Catalogo Moveis
const btnDepartamento = ".popover-wrapper > [type='button']";
const btnMoveis = "[container-wrapper=''] > :nth-child(29)";
const inputValorMinimo = "#valor-minimo";
const inputValorMaximo = "#valor-maximo";
const btnAplicar = ".qa-catalog-apply-price-filter-click";
const firstItem = ".itens-produtos-grid-filtros > :nth-child(1)";
const linkFirstItem = ".itens-produtos-grid-filtros > :nth-child(1) > div > header > a";
const secondItem = ".itens-produtos-grid-filtros > :nth-child(1)";
const linkSecondItem = ".itens-produtos-grid-filtros > :nth-child(1) > div > header > a";
const checkFiltroCozinha = "[for='multipla-escolha-Cozinhas-Categoria']";

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            buscarSkuSimples(mercadoria: SimpleStringMap): Chainable<Element>,
			alterarEstoqueMostruario(): Chainable<Element>,
			catalogoMoveis(): Chainable<Element>,
			buscarFaixaValoresMontagem(faixaValores: Array<SimpleStringMap>): Chainable<Element>,
			buscarSkuConjunto(mercadoria: SimpleStringMap): Chainable<Element>,
        }
    }
}

Cypress.Commands.add("buscarSkuSimples",
	(mercadoria: SimpleStringMap) => {
		cy.get(inputSku).should('be.visible').click();
		cy.get(inputSku).type(mercadoria.sku);
		cy.get(".qa-core-search-for-products-click").click();
		cy.get('.qa-catalog-product-name-read > [title="' + mercadoria.nome + '"]').click();	
	}
);

Cypress.Commands.add("alterarEstoqueMostruario", 
	() => {
		cy.get(labelEstoque).should('be.visible');
		cy.get(btnEstoqueVoltar).should('be.visible').click();
		cy.get(qtdItemEstoque).should('not.contain.text', ' Nenhum ');
	}
);

Cypress.Commands.add("catalogoMoveis",
	() => {
		cy.get(btnDepartamento).should('be.visible').click();
		cy.get(btnMoveis).should('be.visible').click();	
		cy.get(carregando).should("not.exist");
		cy.get(checkFiltroCozinha).should('be.visible').click();
		cy.get(carregando).should("not.exist");
	}
);

Cypress.Commands.add("buscarFaixaValoresMontagem",
	(faixaValores: Array<SimpleStringMap>) => {
		var valorMercadoria: string;
		var valorServicoStr: string;
		var valorServico: number;
		var taxaCliente: number;
		cy.log("teste ");
		var valorServico = 0;
		var taxaCliente = 14;

		for(var k in faixaValores) {
			cy.log("teste 2");
			var faixa = faixaValores[k].faixa;
			var valores = faixa.split("|");

			cy.get(inputValorMinimo).click().clear({force:true}).type(valores[0]);
			cy.wait(1000);
			cy.get(inputValorMaximo).click().clear({force:true}).type(valores[1]);
			cy.wait(1000);
			cy.get(btnAplicar).should('be.visible').click();
			cy.wait(1000);

			cy.get(firstItem).scrollIntoView().should('be.visible');
			cy.get(linkFirstItem).should('be.visible').click();
			cy.wait(1000);
			cy.get(carregando).should("not.exist");

			cy.get(txtValorMercadoria).then(function($valorMercadoria) {
				valorMercadoria = $valorMercadoria.text().trim().split("R$")[1];
				valorMercadoria = valorMercadoria.replace(".","");
				valorMercadoria = valorMercadoria.replace(",",".");
				valorServico = (parseFloat(valorMercadoria) * taxaCliente)/100;

				if(valorServico < 49.9)
					valorServicoStr = " R$ 49,90 ";
				else if(valorServico > 179.9) 
					valorServicoStr = " R$ 179,90 ";
				else
					valorServicoStr = " R$ " + valorServico.toString().replace(".",",") + " ";

				cy.get(txtValorServico).scrollIntoView().should('be.visible');
				cy.get(txtValorServico).should('have.text', valorServicoStr);
			})
			cy.go('back');
			cy.get(carregando).should("not.exist");
		}
	}
);

Cypress.Commands.add("buscarSkuConjunto",
	(mercadoria: SimpleStringMap) => {
		cy.get(inputSku).should('be.visible').click();
		cy.get(inputSku).type(mercadoria.sku);
		cy.get(btnBuscarSku).click();	
		cy.get("div[class='conteudo'] > header >a:nth-of-type(1)").click();	
	}
);

export {};