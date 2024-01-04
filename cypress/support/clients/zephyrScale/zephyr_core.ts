import * as http from 'http';
import https from 'https';
import { URL } from 'url';
import FormData from 'form-data';

import { TestCase, buildTestCase } from './zephyr_types';
import { validateTest } from './zephyr_validators'

type RequestBody = object | Buffer;

type RequestParams = {
    method: string;
    endpoint: string;
    body?: RequestBody;
    headers?: http.OutgoingHttpHeaders;
    queryParameters?: { [key: string]: string };
};

type RequestResponse<T> = {
    data: T;
    headers: http.IncomingHttpHeaders;
};

class JiraApi {
    private JIRA_HOST = 'jira.viavarejo.com.br';
    private ZEPHYR_SCALE_SERVER_BASE_PATH = 'rest/atm/1.0';
    private PROTOCOL = 'https';
    private PORT = 443;
    private authToken: string;

    constructor(connData: { [key: string]: any }) {
        const credentials = `${connData.JiraUser}:${connData.JiraPass}`;
        
        if (connData.connectionProtocol) this.PROTOCOL = connData.connectionProtocol;
        if (connData.JiraHost) this.JIRA_HOST = connData.JiraHost;
        if (connData.JiraPort) this.PORT = connData.JiraPort;
        if (connData.ZephyrScaleServerBasePath) this.ZEPHYR_SCALE_SERVER_BASE_PATH = connData.ZephyrScaleServerBasePath;        

        const encodedCredentials = Buffer.from(credentials).toString('base64');
        this.authToken = `Basic ${encodedCredentials}`;
    }

    private async makeRequest<T>(params: RequestParams): Promise<RequestResponse<T>> {
        const host_base = new URL(`${this.PROTOCOL}://${this.JIRA_HOST}:${this.PORT}/${this.ZEPHYR_SCALE_SERVER_BASE_PATH}/${params.endpoint}`);

        if (params.queryParameters) {
            Object.keys(params.queryParameters).forEach((key, keyIndex, array) => {
                host_base.searchParams.append(key, array[keyIndex]);
            });
        }
        
        const requestOptions: https.RequestOptions = {
            method: params.method,
            headers: {
                'Authorization': this.authToken,
                'X-Atlassian-Token': 'no-check',
                ...params.headers,
            },
        };

        return new Promise<RequestResponse<T>>((resolve, reject) => {
            const req = https.request(host_base, requestOptions, (res) => {
                const chunks: Buffer[] = [];

                res.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                res.on('end', () => {
                    const responseBody = Buffer.concat(chunks);

                    resolve({
                        data: responseBody as unknown as T,
                        headers: res.headers,
                    });
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            if (params.body) {
                if (params.body instanceof Buffer) {
                    const form = new FormData();
                    form.append('file', params.body, {header: 'Content-Type: multipart/form-data'});
                    form.pipe(req);
                    // req.end();
                } else {
                    req.setHeader('Content-Type', 'application/json');
                    req.write(JSON.stringify(params.body));
                    req.end();
                }
            } else {
                req.end();
            }
        });
    }

    public async createTestCase(testCase: TestCase): Promise<Object> {
        const validationResult = validateTest(testCase);

        if (!validationResult.isValid) {
            throw new Error(`Invalid Test Case data: ${validationResult.errorMessage}`);
        }
        
        return await this.makeRequest<Object>({method: 'POST', endpoint: 'testcase', body: testCase, headers: {'Content-Type': 'application/json'}}).then((response: RequestResponse<Object>): Object => { return response.data; });
    }

    public async deleteTestCase(testCaseKey: string): Promise<Object> {
        return await this.makeRequest<Object>({method: 'DELETE', endpoint: `testcase/${testCaseKey}`}).then((response: RequestResponse<Object>): Object => { return response.data; });
    }

    public async updateTestCase(testCaseKey: string, updatedTestCase: TestCase): Promise<Object> {
        const validationResult = validateTest(updatedTestCase);

        if (!validationResult.isValid) {
            throw new Error(`Invalid Test Case data: ${validationResult.errorMessage}`);
        }

        return await this.makeRequest<Object>({method: 'PUT', endpoint: `testcase/${testCaseKey}`, body: updatedTestCase, headers: {'Content-Type': 'application/json'}}).then((response: RequestResponse<Object>): Object => { return response.data; });
    }

    public async getTestCase(testCaseKey: string): Promise<TestCase> {
        let response: RequestResponse<Object>;

        try {
            response = await this.makeRequest<Object>({method: 'GET', endpoint:`testcase/${testCaseKey}`});
            
            let testCase = buildTestCase(JSON.parse(response.data.toString()));
            
            const validationResult = validateTest(testCase);

            if (!validationResult.isValid) {
                throw new Error(`Invalid Test Case data: ${validationResult.errorMessage}`);
            } else {
                return testCase;
            }
        } catch (err) {
            throw new Error(`Error while getting test case: ${err}`);
        }
    }

    public async createTestAttachment(testCaseKey: string, attachment: Buffer): Promise<Object> {
        return await this.makeRequest<Object>({method: 'POST', endpoint: `testcase/${testCaseKey}/attachments`, body: attachment}).then((response: RequestResponse<Object>): Object => { return response.data; });
    }

    public async getTestAttachment(testCaseKey: string): Promise<Buffer> {
        return await this.makeRequest<Buffer>({method: 'GET', endpoint: `testcase/${testCaseKey}/attachments`}).then((response: RequestResponse<Buffer>): Buffer => { return response.data; });
    }

    public async getIssueLinks(issueKey: string): Promise<Object> {
        return await this.makeRequest<Object>({method: 'GET', endpoint: `issuelink/${issueKey}/testcases`}).then((response: RequestResponse<Object>): Object => { return response.data; });
    }

    // public async getXMLTestCase(projectID: string, testCaseId: number): Promise<Buffer> {
    //     const originalServerBasePath = this.ZEPHYR_SCALE_SERVER_BASE_PATH;
    //     this.ZEPHYR_SCALE_SERVER_BASE_PATH = "rest/tests/1.0"
    //     const result = await this.makeRequest<Buffer>({method: 'POST', endpoint: `project/${projectID}/export`, queryParameters: {format: "xml", timezoneOffset: "180"}, body: [testCaseId]}).then((response: RequestResponse<Buffer>): Buffer => { return response.data; });
    //     this.ZEPHYR_SCALE_SERVER_BASE_PATH = originalServerBasePath;
    //     return result;
    // }
}

export default JiraApi;