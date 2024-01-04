// commands.d.ts
declare namespace Cypress {
    interface Chainable {
      CondicaoFluxo(): Chainable<any>;
      Desenquadramento(): Chainable<any>;
      Ediçao(): Chainable<any>;
      IgnoraSku(): Chainable<any>;
      IgnoraSkuMsgerro(): Chainable<any>;
      Refresh(): Chainable<any>;
      Faixadepreço(): Chainable<any>;
      foradecategoria(): Chainable<any>;
      foradefaixadecategoria(): Chainable<any>;
      foradefaixadecategoriad(): Chainable<any>;
      mercadoriaViaMais(): Chainable<any>;
      mercadoriaViaMais2(): Chainable<any>;
    
      // Declare os outros comandos personalizados aqui
    }
  }
  