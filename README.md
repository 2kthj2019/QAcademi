# Cypress Template

Projeto de exemplo para realização de testes utilizando o Cypress.

## Pré-requisitos:
- [NodeJS](https://nodejs.org/en/download/ "NodeJS")

## Ferramentas utilizadas:
- [VSCode](https://code.visualstudio.com/ "VSCode")
- [Cypress](https://www.npmjs.com/package/cypress "Cypress")

## Estrutura de pastas

<pre>
📦vv-template-cypress  
 ┣ 📂.github
 ┣ 📂ci
 ┣ 📂cypress 
 ┃ ┣ 📂downloads 
 ┃ ┣ 📂fixtures  
 ┃ ┃ ┗ 📂hml  
 ┃ ┃   ┣ 📜ambiente.json  
 ┃ ┃   ┗ 📜exemplo_massa.json  
 ┃ ┣ 📂integration  
 ┃ ┃ ┣ 📂api  
 ┃ ┃ ┃ ┗ 📜minhaPrimeira.api.spec.js  
 ┃ ┃ ┗ 📂ui  
 ┃ ┃   ┗ 📜minhaPrimeira.ui.spec.js  
 ┃ ┣ 📂plugins  
 ┃ ┃ ┗ 📜index.js  
 ┃ ┗ 📂support  
 ┃   ┣ 📂commands
 ┃   ┃ ┗ 📜base_commands.js  
 ┃   ┣ 📂services  
 ┃   ┃ ┗ 📂jsonPlaceholder  
 ┃   ┃   ┣ 📂contracts  
 ┃   ┃   ┃ ┗ 📜get.posts.contract.js  
 ┃   ┃   ┗ 📜jsonPlaceholderAPI.js  
 ┃   ┣ 📜commands.js  
 ┃   ┣ 📜index.js  
 ┃   ┗ 📜utils.js  
 ┣ 📜.gitignore  
 ┣ 📜cypress.json  
 ┣ 📜package-lock.json  
 ┣ 📜package.json  
 ┣ 📜README.md
 ┣ 📜tsconfig.json  
 ┗ 📜tslint.md  
 </pre>
 
## Tutorial, Instalação e Execução

### Executar este projeto em sua maquina

* Em um terminal, dentro da pasta do projeto, execute o seguinte comando:

**Instalar as dependências:**  
```
npm i
```

### Utilizando o cypress

* Em um terminal execute um dos comandos abaixo para abrir o cypress:
```
npm run cy:open 
```
ou
```
npx cypress open 
```
Executar testes com o Cypress aberto irá gerar somente reports do Allure, sem participação do reporter Mochawesome.

* Para executar os testes diretamente, sem abrir o Cypress use:
```
npm run cy:test 
```
ou
```
npx cypress run 
```
Executar testes através da linha de comando irá gerar reports tanto do Allure como também do Mochawesome.

### Comandos de execução alternativos:
A ferramenta já vem com alguns comandos de execução alternativos, que você pode trocar ou alterar o funcionamento mexendo no respectivo script em 'package.json'. Estes comandos são:

Rodar cenários que possuam a string '@aceitacao' no nome.
```
npm run cy:test-aceitacao
```

Rodar cenários que possuam a string '@contrato' no nome.
```
npm run cy:test-contrato
```

Rodar somente specs que estejam dentro de './cypress/integration/api'.
```
npm run cy:test-api
```

Rodar somente specs que estejam dentro de './cypress/integration/ui'.
```
npm run cy:test-ui
```

### Trabalhando com reports do Allure:  
Uma execução que gera reports do Allure irá criar uma pasta chamada 'allure-results' dentro da raiz do projeto. Se esta pasta existir e possuir arquivos válidos, você pode visualizar os resultados usando:
```
npm run allure:serve
```
Contudo, os resultados serão gerados e armazenados em uma pasta temporária que é destruída depois que você desligar o servidor Allure que foi levantado na sua máquina. Dica: use a combinação 'Ctrl + C', ou equivalente, para interromper o processo e recuperar seu terminal.

Se preferir, você pode persistir os reports também na raiz do projeto, para isso rode o comando:
```
npm run allure:report
```
Depois que você rodar esse comando uma pasta 'allure-report' será criada na raiz do projeto. Para ver os resultados dela, então rode:
```
npm run allure:open
```
Para encerrar o servidor Allure, lembre-se de usar a combinação 'Ctrl + C', ou equivalente.

Finalmente, para remover os resultados Allure do seu projeto, rode o comando:
```
npm run allure:clean
```