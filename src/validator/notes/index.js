const { notePayloadSchema, notePatchPayloaadSchema } = require('./schema');
const InvariantError = require('../../exception/InvariantError');

const NotesValidator = {
  validateNotePayload: (payload) => {
    const validationResult = notePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.details[0].message);
    }
  },
  validateNotePatchPayload: (payload) => {
    const validationResult = notePatchPayloaadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.details[0].message);
    }
  },
};

module.exports = NotesValidator;
