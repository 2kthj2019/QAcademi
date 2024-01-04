import { TestCase } from '../zephyr_types';

// This is the response from Zephyr Scale API for a test case entity. Parameters like index and id are not accepted when writing a test case though...
export const fullTestCase : TestCase = {
  projectKey: 'VVDSL',
  name: 'Nome;A',
  testScript: {
    id: 58369,
    type: 'STEP_BY_STEP',
    steps: [
      {
        testData: 'Data: <span class="atwho-inserted" data-atwho-at-query="{">{Push}</span>⁠ ',
        expectedResult: '<img src="../rest/tests/1.0/attachment/image/193364" style="width:300px" class="fr-fic fr-fil fr-dib" />',
        description: 'Teste',
        index: 0,
        id: 96551
      },
      {
        testCaseKey: 'VVDSL-T33',
        stepParameters: [
          {
            testCaseParameter: {
              testCaseKey: 'VVDSL-T33',
              defaultValue: 'Selecionar Endereço',
              name: 'formaEntrega',
              index: 2,
              id: 925
            },
            id: 4863,
            value: '121212'
          },
          {
            testCaseParameter: {
              testCaseKey: 'VVDSL-T33',
              defaultValue: 'Dinheiro',
              name: 'negociacao',
              index: 3,
              id: 926
            },
            id: 4864,
            value: '232323'
          },
          {
            testCaseParameter: {
              testCaseKey: 'VVDSL-T33',
              defaultValue: 'PF',
              name: 'cliente',
              index: 4,
              id: 927
            },
            id: 4865,
            value: '343434'
          }
        ],
        index: 1,
        id: 96552
      },
      {
        testData: 'Step Data: <span class="atwho-inserted" data-atwho-at-query="{">{World}</span>⁠ ',
        expectedResult: 'Teste WIth Image<br /><br /><img src="../rest/tests/1.0/attachment/image/193365" style="width:300px" class="fr-fic fr-fil fr-dib" />',        
        description: 'Test Step',
        index: 2,
        id: 96553
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
  issueLinks: undefined,
  parameters: { variables: [], entries: [] }
}