import * as solr from 'solr-client';
import { SearchResponse } from 'solr-client/dist/lib/solr';
import { SolrClientParams, AddResponse, JsonResponseData, ResourceOptions } from 'solr-client/dist/lib/types';
import { SearchOptions } from './solr_types';

class SolrService {
    private client: solr.Client;

    constructor(options: SolrClientParams) {
        this.client = solr.createClient(options);
    }

    async addDocuments(docs: object[]): Promise<{addResult: AddResponse, commitResult: JsonResponseData}> {
        return new Promise((resolve, reject) => {
            this.client.add(docs).then(
                (addResult: AddResponse) => {
                    this.client.commit().then(
                        (commitResult: JsonResponseData) => {
                            resolve({addResult, commitResult});
                        },
                        (reason: any) => {
                            reject(reason);
                        }
                    );
                }, 
                (reason: any) => {
                    reject(reason);
                }
            );
        });
    };

    async uploadFile(fileData: ResourceOptions): Promise<{addRsrcResult: JsonResponseData, commitResult: JsonResponseData}> {
        return new Promise((resolve, reject) => {
            this.client.addRemoteResource(fileData).then(
                (addRsrcResult: JsonResponseData) => {
                    this.client.commit().then(
                        (commitResult: JsonResponseData) => {
                            resolve({addRsrcResult, commitResult});
                        },
                        (reason: any) => {
                            reject(reason);
                        }
                    );
                },
                (reason: any) => {
                    reject(reason);
                }
            );
        });
    }

    
      
    async search(query: string | SearchOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            let solrQuery: solr.Query;

            if (typeof query === 'string') {
                solrQuery = this.client.query().q(query);
            } else {
                solrQuery = this.client.query();

                if (query.query) {
                    solrQuery.q(query.query);
                }

                if (query.filter) {
                    solrQuery.matchFilter('fq', query.filter);
                }

                if (query.fields) {
                    solrQuery.fl(query.fields.join(','));
                }

                if (query.sort) {
                    solrQuery.sort(query.sort);
                }

                if (query.start !== undefined) {
                    solrQuery.start(query.start);
                }

                if (query.rows !== undefined) {
                    solrQuery.rows(query.rows);
                }
            }

            this.client.search(solrQuery).then(
                (result: SearchResponse<unknown>) => {
                    resolve(result);
                },
                (reason: any) => {
                    reject(reason);
                }
            );
        });
    }

  async ping(): Promise<JsonResponseData> {
    return new Promise((resolve, reject) => {
      this.client.ping().then(
        (result: JsonResponseData) => {
            resolve(result);
        },
        (reason: any) => {
            reject(reason);
        }
      );
    });
  }
}

export default SolrService;