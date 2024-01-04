import Joi from 'joi';
import { testScriptSchema, parametersSchema } from './testcase.shared.contracts';

const testCaseSchema = Joi.object({
	projectKey: Joi.string().required(),
	name: Joi.string().required(),
	testScript: testScriptSchema.optional(),
	customFields: Joi.object().optional(),
	precondition: Joi.string().optional(),
	objective: Joi.string().optional(),
	folder: Joi.string().optional(),
	status: Joi.string().optional(),
	priority: Joi.string().optional(),
	component: Joi.string().optional(),
	owner: Joi.string().optional(),
	estimatedTime: Joi.number().optional(),
	labels: Joi.array().items(Joi.string()).optional(),
	issueLinks: Joi.array().items(Joi.string()).optional(),
	parameters: parametersSchema.optional(),
});

export { testCaseSchema };