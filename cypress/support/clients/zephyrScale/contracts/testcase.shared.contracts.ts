import Joi from 'joi';

    const stepSchema = Joi.object({
        id: Joi.number().optional(),
        testCaseKey: Joi.string().optional(),
        description: Joi.string()
        .when('id', {
            is: Joi.exist(),
            then: Joi.allow('').optional(),
            otherwise: Joi.disallow(''),
        })
        .when('testCaseKey', {
            is: Joi.exist(),
            then: Joi.forbidden()
        }),
        testData: Joi.string().optional(),
        index: Joi.number().optional(),
        expectedResult: Joi.string().allow('').optional(),
        stepParameters: Joi.array().items(
            Joi.object({
                testCaseParameter: Joi.object({
                    testCaseKey: Joi.string(),
                    defaultValue: Joi.string(),
                    name: Joi.string(),
                    index: Joi.number(),
                    id: Joi.number(),
                }),
                id: Joi.number(),
                value: Joi.string(),
            })).optional(),
    }).or('id', 'testCaseKey', 'description');
  
  const testScriptSchema = Joi.object({
      id: Joi.number().optional(),
      type: Joi.string().required().valid('PLAIN_TEXT', 'STEP_BY_STEP'),
      text: Joi.string().optional(),
      steps: Joi.array().items(stepSchema).optional(),
  }).when(Joi.object({ type: Joi.string().valid('PLAIN_TEXT') }).unknown(), {
      then: Joi.object({ text: Joi.string().required() }),
      otherwise: Joi.object({ steps: Joi.array().items(stepSchema).required() }),
  });
  
  const parametersSchema = Joi.object({
      variables: Joi.array().items(
          Joi.object({
              name: Joi.string().required(),
              type: Joi.string().required().valid('FREE_TEXT', 'DATA_SET'),
              dataSet: Joi.string().optional(),
          }),
      ).required(),
      entries: Joi.array().items(
          Joi.object().pattern(
              Joi.string(), 
              Joi.string().required()
          )
      ).required(),
  });

  export { testScriptSchema, stepSchema, parametersSchema };