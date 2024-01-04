/// <reference types="cypress" />
//import '../../../support/command/commands';
import { Util, SimpleStringMap } from "../../../support/utils";
import '@shelex/cypress-allure-plugin';

describe('Plataforma-Enquadramento', () => {
   
    let testData: SimpleStringMap = {};

    before(() => {
        Util.inicializarMassas(["enderecos"], testData);
    });

    beforeEach(() => {
        
        cy.visit(testData.enderecos.Enquadramento);
       
    });

    it('PSS-T1497 - Realizar um enquadramento de um sku', () => {
        cy.viewport(1500, 1000);
        cy.CondicaoFluxo();
    });

    it('PSS-T1499 - Realizar ediçao de categoria do parceiro', () => {
        cy.viewport(1500, 1000);
        cy.Ediçao();
    });

    it('PSS-T1501 - Ignorar Sku', () => {
        cy.viewport(1500, 1000);
        cy.IgnoraSku();
    });

    it('PSS-T1549 - Ignorar Sku Com alerta de Erro', () => {
        cy.viewport(1500, 1000);
        cy.IgnoraSkuMsgerro();
    });


    it.only('PSS-T1500 - Atualizar listagem', () => {
        cy.viewport(1500, 1000);
        cy.Refresh();
    });

    it('PSS-T1461 - Validar que se o produto não tem faixa de preço, eu não poderei ofertar seguro ou serviço (enquadrar) para este SKU.', () => {
        cy.viewport(1500, 1000);
        cy.Faixadepreço();
    });

    it('PSS-T1462 - Validar que se o produto não tem categoria de parceiro, eu não poderei ofertar seguro ou serviço (enquadrar) para este SKU.', () => {
        cy.viewport(1500, 1000);
        cy.foradecategoria();
    });

    it('PSS-T1464 -  Associar uma Categoria que não possua faixa para o preço da mercadoria (assumindo mercadoria com preço e cobertura)', () => {
        cy.viewport(1500, 1000);
        cy.foradefaixadecategoria();
    });

    it('PSS-T1464 -  Associar uma Categoria que não possua faixa para o preço da mercadoria (assumindo mercadoria com preço e cobertura)', () => {
        cy.viewport(1500, 1000);
        cy.foradefaixadecategoriad();
    });
});
