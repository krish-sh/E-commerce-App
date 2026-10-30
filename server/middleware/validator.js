import { ApiError } from "../utils/apiError.js";

export const validator = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const extractedError = result.error.issues.map((issue) => ({
      [issue.path.join(".")]: issue.message,
    }));

    throw new ApiError(422, "Received data is not valid", extractedError);
  }

  req.body = result.data;
  next();
};
