import Joi from 'joi';

const postObjectSchema = Joi.object().keys({
	userId: Joi.number().required(),
	id: Joi.number().required(),
	title: Joi.string().required(),
	body: Joi.string().required()
});

const getPostsSchema = Joi.array().items(postObjectSchema);

export default getPostsSchema;