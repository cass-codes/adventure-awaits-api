import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";
import { NextFunction, Request, Response } from "express";

const validator = new Ajv({
  allErrors: true,
  verbose: true,
});

addFormats(validator);
ajvErrors(validator);

export function validationFunction<T>(schema: JSONSchemaType<T>) {
  return (request: Request, response: Response, next: NextFunction) => {
    const valid = validator.validate(schema, request.body);
    if (!valid) {
      throw new Error(validator.errorsText());
    } else {
      next();
    }
  };
}
