import { AddResponse, JsonResponseData, ResourceOptions, SolrClientParams } from 'solr-client/dist/lib/types';
import { SearchOptions } from './solr_types';
import SolrService from './solr_core';

let solrClient: SolrService;

function loadSolrTasks(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
    on('task', {
        solrStart(solrOpts: SolrClientParams) {
            solrClient = new SolrService(solrOpts);
            return null;
        },
        async solrPing(): Promise<JsonResponseData> {
            return await solrClient.ping();
        },
        async solrSearch(query: string | SearchOptions): Promise<any> {
            return await solrClient.search(query);
        },
        async solrWrite(docs: { [ k:string ]: any }[]): Promise<{addResult: AddResponse, commitResult: JsonResponseData}> {
            return await solrClient.addDocuments(docs);
        },
        async solrUpload(fileData: ResourceOptions): Promise<{addRsrcResult: JsonResponseData, commitResult: JsonResponseData}> {
            return await solrClient.uploadFile(fileData);
        }
    });
}

export default loadSolrTasks;