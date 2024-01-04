/// <reference types="cypress" />

import JsonPlaceholderService from "../../support/services/jsonPlaceholder/jsonPlaceholderAPI";
import getPostsSchema from "../../support/services/jsonPlaceholder/contracts/get.posts.contract";

context('JSON Placeholder Service', () => {	
	describe("Minha Primeira Funcionalidade", () => {
		it("@contrato - Meu Primeiro Cenário", () => {
			const apiService = new JsonPlaceholderService();
			apiService.getPosts().then((response) => {
				expect(response.status).to.eql(200);
				const resultadoValidacao = getPostsSchema.validate(response.body);
				expect(resultadoValidacao.error).to.eql(undefined);
			});
		});
	});
});
