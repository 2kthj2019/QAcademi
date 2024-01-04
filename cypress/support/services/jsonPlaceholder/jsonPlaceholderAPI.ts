/// <reference types="cypress" />

export default class JsonPlaceholderService {
    private url: string;
    
    constructor() {
        this.url = "https://jsonplaceholder.typicode.com";
    }

    getPosts() {
        return cy.request({
            method: "GET",
            url: `${this.url}/posts`
        });
    }
}