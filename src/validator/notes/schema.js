import Joi from 'joi';

const notePayloadSchema = Joi.object({
  title: Joi.string().min(3).required(),
  body: Joi.string().min(10).required(),
  tags: Joi.array().items(Joi.string()).required(),
});

const notePatchPayloadSchema = notePayloadSchema.fork(['title', 'body', 'tags'], (schema) => schema.optional());

export { notePayloadSchema, notePatchPayloadSchema };
