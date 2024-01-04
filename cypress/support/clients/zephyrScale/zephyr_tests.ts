import JiraApi from "./zephyr_core";
import * as testCaseWriteModels from "./contracts/model_write_testcase";

function runTestCaseSuite(connData: { [key: string]: any }) {
    const api = new JiraApi(connData);
    testCaseRetrieval(api);
    // testCaseCreationSimple(api);
    // testCaseCreationSimpleText(api);
    // testCaseCreationSimpleStep(api);
    // testCaseCreationSimpleParameter(api);
    // testCaseCreationSimpleCustomFields(api);
    // testCaseCreationSimpleCallTest(api);
    // testCaseCreationFull(api);
    // testCaseCreationFullAllFields(api);
}

function runMiscellaneousSuite(connData: { [key: string]: any }) {
    const api = new JiraApi(connData);
    testIssueLinksRetrieval(api);
}

async function testCaseCreationSimple(api: JiraApi) {
    const testCaseData = testCaseWriteModels.simpleTestCase;
    return await api.createTestCase(testCaseData).then((response) => {console.log(response.toString())});
}

async function testCaseCreationSimpleText(api: JiraApi) {
    const testCaseData = testCaseWriteModels.simpleTestCaseTextScript;
    return await api.createTestCase(testCaseData).then((response) => {console.log(response.toString())});
}

async function testCaseCreationSimpleStep(api: JiraApi) {
    const testCaseData = testCaseWriteModels.simpleTestCaseStepScript;
    return await api.createTestCase(testCaseData).then((response) => {console.log(response.toString())});
}

async function testCaseCreationSimpleParameter(api: JiraApi) {
    const testCaseData = testCaseWriteModels.simpleTestCaseParameterTest;
    return await api.createTestCase(testCaseData).then((response) => {console.log(response.toString())});
}

async function testCaseCreationSimpleCustomFields(api: JiraApi) {
    const testCaseData = testCaseWriteModels.simpleTestCaseCustomFields;
    return await api.createTestCase(testCaseData).then((response) => {console.log(response.toString())});
}

async function testCaseCreationSimpleCallTest(api: JiraApi) {
    const testCaseData = testCaseWriteModels.simpleTestCaseCallTest;
    return await api.createTestCase(testCaseData).then((response) => {console.log(response.toString())});
}

async function testCaseCreationFull(api: JiraApi) {
    const testCaseData = testCaseWriteModels.fullTestCase;
    return await api.createTestCase(testCaseData).then((response) => {console.log(response.toString())});
}

async function testCaseCreationFullAllFields(api: JiraApi) {
    const testCaseData = testCaseWriteModels.fullTestCaseAllFields;
    return await api.createTestCase(testCaseData).then((response) => {console.log(response.toString())});
}



async function testCaseRetrieval(api: JiraApi, testCaseKey: string = "VVDSL-T99") {
    return await api.getTestCase(testCaseKey).then(
        (testCase) => {
            console.log(testCase)
            console.log(testCase.testScript)
            console.log(testCase.testScript.steps)
            console.log(testCase.parameters)
        }
    );
}

async function testIssueLinksRetrieval(api: JiraApi, testCaseKey: string = "VVDSL-T99") {
    return await api.getIssueLinks(testCaseKey).then(
        (issueLinks) => {
            console.log(issueLinks)
        }
    );
}

export { runTestCaseSuite, runMiscellaneousSuite }
