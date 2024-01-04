import { TestCase } from "../zephyr_types";

const simpleTestCase: TestCase = {
	"projectKey": "VVDSL",
	"name": "Zephyr API Test Roni"
}

const simpleTestCaseStepScript: TestCase = {
	"projectKey": "VVDSL",
	"name": "Zephyr API Step by Step Test Roni",
	"testScript": {
		"type": "STEP_BY_STEP",
		"steps": [
			{
				"description": "Passo 1",
				"testData": "Combustion chamber's initial pressure: 10",
				"expectedResult": "Ensure the high-pressure combustion chamber's pressure is around 3000 psi."
			}
		]
	}
}

const simpleTestCaseTextScript: TestCase = {
	"projectKey": "VVDSL",
	"name": "Zephyr API Text Test Roni",
	"testScript": {
		"type": "PLAIN_TEXT",
		"text": "Passo 29."
	}
}

const simpleTestCaseCustomFields: TestCase = {
	"projectKey": "VVDSL",
	"name": "Zephyr API Custom Fields Test Roni",
	"customFields": {
		"Script Funcional": "https://github.com/viavarejo-internal/atende-mais-cypress/blob/master/cypress/support/services/zephyrScaleApi/zephyrScaleApiV1.js",
		"Script Não Funcional": "https://github.com/viavarejo-internal/atende-mais-cypress/blob/master/cypress/support/services/zephyrScaleApi/zephyrScaleApiV1.js",
	}
}

const simpleTestCaseCallTest: TestCase = {
  "projectKey": "VVDSL",
  "name": "Zephyr API Call Test Roni",
  "testScript": {
	"type": "STEP_BY_STEP",
	"steps": [
	  {
		"testCaseKey": "VVDSL-T35"
	  },
	  {
		"description": "ALL STEAM AHEAD!",
		"testData": "Combustion chamber's initial pressure: 10",
		"expectedResult": "Ensure the high-pressure combustion chamber's pressure is around 3000 psi."
	  },
	  {
		"testCaseKey": "VVDSL-T33"
	  }
	]
  }
}

const simpleTestCaseParameterTest: TestCase = {
	"projectKey": "VVDSL",
	"name": "Zephyr API Parameter Test Roni",
	"parameters": {
		"variables": [
		{
			"name": "Username",
			"type": "FREE_TEXT"
		},
		{
			"name": "Country",
			"type": "DATA_SET",
			"dataSet": "Country"
		}
		],
		"entries": [
		{
			"Username": "Admin",
			"Country": "England"
		},
		{
			"Username": "Tester",
			"Country": "Brazil"
		}
		]
	},
	"testScript": {
		"type": "STEP_BY_STEP",
		"steps": [
		{
			"description": "User {Username} is from {Country}"
		}
		]
	}
}

const fullTestCase: TestCase = {
	"projectKey": "VVDSL",
	"name": "Ensure the axial-flow pump is enabled",
	"precondition": "The precondition.",
	"objective": "The objective.",
	"folder": "/Validação Produção",
	"status": "Automatizado",
	"priority": "Alto Risco",
	"estimatedTime": 138000,
	"labels": ["Smoke", "Functional"],
	"issueLinks": ["VVDSL-123", "VVDSL-456"],
	"customFields": {
		"Script Funcional": "Propulsion engines",
		"Script Não Funcional": "Brazil, England"
	},
	"testScript": {
		"type": "STEP_BY_STEP",
		"steps": [
		{
			"description": "Ignite the secondary propulsion engines.",
			"testData": "Combustion chamber's initial pressure: 10",
			"expectedResult": "Ensure the high-pressure combustion chamber's pressure is around 3000 psi."
		}
		]
	}
}

const fullTestCaseAllFields: TestCase = {
	projectKey: 'VVDSL',
	name: 'Nome;A',
	testScript: {
	  type: 'STEP_BY_STEP',
	  steps: [
		{
		  testData: 'Data: <span class="atwho-inserted" data-atwho-at-query="{">{Push}</span>⁠ ',
		  expectedResult: '<img src="../rest/tests/1.0/attachment/image/193364" style="width:300px" class="fr-fic fr-fil fr-dib" />',
		  description: 'Teste',
		},
		{
		  testCaseKey: 'VVDSL-T33',
		},
		{
		  testData: 'Step Data: <span class="atwho-inserted" data-atwho-at-query="{">{World}</span>⁠ ',
		  expectedResult: 'Teste WIth Image<br /><br /><img src="../rest/tests/1.0/attachment/image/193365" style="width:300px" class="fr-fic fr-fil fr-dib" />',
		  description: 'Test Step',
		}
	  ]
	},
	customFields: {
	  'Script Não Funcional': 'ScriptNFunc',
	  'Script Funcional': 'ScriptFunc'
	},
	precondition: 'PreconC',
	objective: 'ObjB',
	folder: '/Via Mais - Regres. PROD/Médios',
	status: 'Automatizado',
	priority: 'Alto Risco',
	component: undefined,
	owner: '2104546733',
	estimatedTime: 4920000,
	labels: [ 'test', 'hello', 'world' ],
	issueLinks: ["VVDSL-123", "VVDSL-456"],
	parameters: { variables: [
		{
			"name": "Push",
			"type": "FREE_TEXT",
		},
		{
			"name": "World",
			"type": "FREE_TEXT",
		}
	], entries: [] }
}

export { simpleTestCase, simpleTestCaseStepScript, simpleTestCaseTextScript, simpleTestCaseCustomFields, simpleTestCaseCallTest, simpleTestCaseParameterTest, fullTestCase, fullTestCaseAllFields}