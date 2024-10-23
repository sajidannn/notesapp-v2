import { notePayloadSchema, notePatchPayloadSchema } from './schema.js';
import InvariantError from '../../exception/InvariantError.js';

const NotesValidator = {
  validateNotePayload: (payload) => {
    const validationResult = notePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.details[0].message);
    }
  },
  validateNotePatchPayload: (payload) => {
    const validationResult = notePatchPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.details[0].message);
    }
  },
};

export default NotesValidator;
