import { TestCase } from './zephyr_types';
import { testCaseSchema } from './contracts/testcase.entity.contracts';
import { stepSchema } from './contracts/testcase.shared.contracts';
import Joi from 'joi';

function validateTest(testCase: TestCase, schema: Joi.ObjectSchema<any> = testCaseSchema) {
    const { error } = schema.validate(testCase);
    return {
        isValid: !error,
        errorMessage: error?.message || '',
    };
};

function debug_validateStep(step: any, schema: Joi.ObjectSchema<any> = stepSchema) {
    const { error } = schema.validate(step);
    return {
        isValid: !error,
        errorMessage: error?.message || '',
    };
}

export { validateTest };