import { userPayloadSchema } from "./schema.js";
import InvariantError from "../../exception/InvariantError.js";

const UsersValidator = {
  validateUserPayload: (payload) => {
    const validationResult = userPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default UsersValidator;