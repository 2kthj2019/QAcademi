type TestExecution = {
}

type TestCase = {
    projectKey: string;
    name: string;
    testScript?: any;
    customFields?: any;
    precondition?: string;
    objective?: string;
    folder?: string;
    status?: string;
    priority?: string;
    component?: string;
    owner?: string;
    estimatedTime?: number;
    labels?: string[];
    issueLinks?: string[];
    parameters?: any;
};

type TestCycle = {
}

type TestPlan = {
}

type ZephyrExecutionRunData = {
    JiraTestPlan: TestPlan,
    JiraTestCycle: TestCycle
}

type ZephyrSynchronizationData = {
    JiraTestCases: TestCase[],
}

function buildTestCase(json: { [key: string]: any }): TestCase {
    return {
        projectKey: json.projectKey,
        name: json.name,
        testScript: json.testScript,
        customFields: json.customFields,
        precondition: json.precondition,
        objective: json.objective,
        folder: json.folder,
        status: json.status,
        priority: json.priority,
        component: json.component,
        owner: json.owner,
        estimatedTime: json.estimatedTime,
        labels: json.labels,
        issueLinks: json.issueLinks,
        parameters: json.parameters
    };
}

export { TestPlan, TestCycle, TestCase, buildTestCase, TestExecution, ZephyrExecutionRunData, ZephyrSynchronizationData };