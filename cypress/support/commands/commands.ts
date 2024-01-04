	import { elementoCarregamento } from "./elementosCompartilhados";

	const SelecionarSku = ':nth-child(2) > .col-check > .col-check-data > dsvia-angular-checkbox > .check-label > .check-input  '
	const clickbotão = '.button'
	const clickbotão2 = ':nth-child(2) > .button'
	const confirmaMSG = '.alert--success'
	const botaoEditar = ':nth-child(1) > [data-label="Editar Categoria"] > .icon-edit'
	const botaodeexpansão = '.icon-expand_more'
	const opçao98 = '.combo-box__options > :nth-child(2)'
	const botaoconfirmEdita = ':nth-child(2) > .button'

	Cypress.Commands.add(
		"CondicaoFluxo",
		() => {

			cy.get(clickbotão)
				.should('be.visible')
				.each(($btn) => {
					if ($btn.hasClass('disabled')) {
						cy.wrap($btn)
						cy.get(botaoEditar).click()
						cy.get(botaodeexpansão).click()
						cy.get(opçao98).click()
						cy.get(botaoconfirmEdita).click()
						cy.wait(1000)
						cy.get(SelecionarSku).check();
						cy.get(clickbotão).should('be.visible').click();
						cy.get(clickbotão2).click();
						cy.get(confirmaMSG).contains('Sucesso ao realizar a Oferta dos Itens.')

					} else {
						cy.get(clickbotão).should('be.visible').click();
						cy.get('.button > .text')
						cy.get(clickbotão2).click();
						cy.get(confirmaMSG).contains('Sucesso ao realizar a Oferta dos Itens.')
					}
				})

		}
	);

	const ensd = '[href="#enquadrados"]'
	const verificarCampo = '.input__element > .ng-untouched'
	const digitacampo = '.input__element > .ng-untouched'
	const pesquisarCampo = '.icon-search'
	const botaodesenquadra = ':nth-child(1) > [data-label="Ação"] > .icone-desenquadrar'
	const botaoconfirmadesequatramento = '.button > .text'


	Cypress.Commands.add(
		"Desenquadramento",
		() => {

			cy.get(ensd).click()
			//cy.get(verificarCampo).should("have.value", "");
			cy.get(digitacampo).type('3201');
			cy.get(pesquisarCampo).click();
			cy.get(botaodesenquadra).click();
			cy.get(botaoconfirmadesequatramento).click()



		})

	const BotaoEditar = ':nth-child(1) > [data-label="Editar Categoria"] > .icon-edit'
	const opçao = '.combo-box__options > :nth-child(4)'
	const title = '.title'
	const descriçao = '.text-content > .description'
	const descriçaoErro ='.alert--error'

	Cypress.Commands.add(
		"Ediçao",
		() => {

			cy.get(BotaoEditar).click();
			cy.get(botaodeexpansão).click()
			cy.get(opçao).click();
			cy.get(botaoconfirmEdita).click();
			cy.get(title).contains('Concluído!')
			cy.get(descriçao).contains('Categoria editada')




		})

const Botaoignorar = '.button--secondary > .text'
const clickbotãoconfirma =':nth-child(2) > .button'
const SelecionarSku1 = ':nth-child(3) > .col-check > .col-check-data > dsvia-angular-checkbox > .check-label > .check-input  '

	Cypress.Commands.add(
		"IgnoraSku",
		() => {

			cy.get(SelecionarSku1).check();
			cy.get(Botaoignorar).should('be.visible').click();
			cy.get(clickbotãoconfirma).click();
			cy.get(title).contains('Concluído!')
			cy.get(descriçao).contains('Produtos removidos')

		})

	
		Cypress.Commands.add(
			"IgnoraSkuMsgerro",
			() => {
	
				cy.get(SelecionarSku).check();
				cy.get(Botaoignorar).should('be.visible').click();
				cy.get(clickbotãoconfirma).click();
				cy.get(title).contains('Falha ao ignorar mercadoria')
				cy.get(descriçaoErro).contains('Uma ou mais mercadorias não podem ser ignoradas, pois possuem oferta ativa de SeS.')
	
			})

			const BotaoRefresh = '.icon-refresh'
			const numraçaopaginas = '.paginate-label-contador'
			
	Cypress.Commands.add(
		"Refresh",
		() => {

			cy.get(BotaoRefresh).click()
			cy.get(numraçaopaginas).contains('01')

		})

	Cypress.Commands.add(
		"Faixadepreço",
		() => {

			cy.get(iconedemsg).contains(' Preço indisponível')
			cy.get(botaodisable).should('be.disabled')

		})

	const iconedemsginf = ':nth-child(3) > .col-check > .col-check-data > .icon > .icon-info'

	Cypress.Commands.add(
		"foradecategoria",
		() => {

			cy.get(iconedemsginf).contains('Selecione a categoria do parceiro')
			cy.get(botaodisable).should('be.disabled')

		})


	const opçao1 = '.combo-box__options > :nth-child(20)'
	const consultafaixa = ':nth-child(1) > .col-check > .col-check-data > .icon > .icon-warning'

	Cypress.Commands.add(
		"foradefaixadecategoria",
		() => {

			cy.get(BotaoEditar).click();
			cy.get(botaodeexpansão).click()
			cy.get(opçao1).click();
			cy.get(botaoconfirmEdita).click();
			cy.get(title).contains('Concluído!')
			cy.get(descriçao).contains('Categoria editada')
			cy.get(consultafaixa).contains('A categoria não possui faixa de preço para o valor da mercadoria')


		})

	const BotaoEditar2 = ':nth-child(3) > [data-label="Editar Categoria"] > .icon-edit'
	const opçao12 = '.combo-box__options > :nth-child(6)'
	const opçao2 = '.combo-box__options > :nth-child(6)'
	const wait = '.icon-warning'


	Cypress.Commands.add(
		"foradefaixadecategoriad",
		() => {


			cy.title().should('eq', 'PlataformaSes')
			cy.get('tbody').then((tbody) => {
				if (tbody.find(':nth-child(2) > [data-label="Valor"]').length > 0) {


					cy.get(BotaoEditar2).click();
					cy.get(botaodeexpansão).click()
					cy.get(opçao12).click();
					cy.get(botaoconfirmEdita).click();
					cy.get(title).contains('Concluído!')
					cy.get(descriçao).contains('Categoria editada')
					cy.get(wait).contains('A categoria não possui faixa de preço para o valor da mercadoria')
				} else {


					cy.get('.div-button-filter > dsvia-angular-button > .button--secondary').click()
				}
			})
		})


	const Botaofiltrar = '.icon-filter_alt'
	const Campofiltrar = '.ng-dirty'
	const BotaoconfirmaFiltrar = ':nth-child(2) > .button > .text'
	const TitleFiltrar = '.title'
	const Descriçaofiltrar = '.description'
	const AlertaFiltrar = '.alert--success'
	const Fecharalert = '.alert--success > .icon-close'




	Cypress.Commands.add(
		"filtrar",
		() => {

			cy.get(Botaofiltrar).click()
			cy.get(Campofiltrar).type('5192862');
			cy.get(BotaoconfirmaFiltrar).click()
			cy.get(TitleFiltrar).contains('Sucesso!')
			cy.get(Descriçaofiltrar).contains('Filtro aplicado')
			cy.get(AlertaFiltrar).should('be.visible')
			cy.wait(3900)
			cy.get(Fecharalert).click()







		})


	const Limparfiltos = '.icon-close'

	Cypress.Commands.add(
		"Limparfiltro",
		() => {

			cy.get(Botaofiltrar).click()
			cy.get(Campofiltrar).type('5192862');
			cy.get(BotaoconfirmaFiltrar).click()
			cy.get(TitleFiltrar).contains('Sucesso!')
			cy.get(Descriçaofiltrar).contains('Filtro aplicado')
			cy.get(AlertaFiltrar).should('be.visible')
			cy.wait(3900)
			cy.get(Fecharalert).click()
			cy.get(Limparfiltos).click()







		})

	const texto = '.text'

	Cypress.Commands.add(
		"Mensagem",
		() => {

			cy.get(ensd).click()
			cy.get(digitacampo).type('3201');
			cy.get(pesquisarCampo).click();
			cy.get(texto).contains('Nenhum SKU encontrado')




		})

