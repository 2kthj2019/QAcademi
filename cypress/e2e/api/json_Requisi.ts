// cypress/support/jsonRequest.js

export class JsonRequest {
    name: any;
    job: any;
    constructor(name: any, job: any) {
      this.name = name;
      this.job = job;
    }
  }
  