/// <reference types="node" />

import { defineConfig } from "cypress";

import loadLogTasks from "cypress/support/tasks/log_tasks";
import loadRedisTasks from "cypress/support/clients/redis/redis_tasks";
import loadDB2Tasks from "cypress/support/clients/db2/db2_tasks";
import loadKafkaTasks from "cypress/support/clients/kafka/kafka_tasks";
import loadMongoDbTasks from "cypress/support/clients/mongodb/mongodb_tasks";
import loadSolrTasks from "cypress/support/clients/solr/solr_tasks";

const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const grepTags = require('@cypress/grep/src/plugin');

export default defineConfig({
	env: {
		estagioDev: "dev",
		bandeira: "viamaisCB",
		allure: true,
		grepOmitFiltered: true,
		grepFilterSpecs: true
	},
	viewportWidth: 1280,
	viewportHeight: 720,
	defaultCommandTimeout: 10000,
	requestTimeout: 50000,
	chromeWebSecurity: false,
	experimentalStudio: false,
	projectId: 'owm12o',
	retries: 0,
	video: false,
  	e2e: {
    	specPattern: 'cypress/e2e/**/*.{ts,tsx}',
    	setupNodeEvents(on, config) {
			loadLogTasks(on, config);
			loadRedisTasks(on, config);
			loadDB2Tasks(on, config);
			loadKafkaTasks(on, config);
			loadMongoDbTasks(on, config);
			loadSolrTasks(on, config);
      		grepTags(config);
      		allureWriter(on, config);
      		return config;
    	}
  	}
});
