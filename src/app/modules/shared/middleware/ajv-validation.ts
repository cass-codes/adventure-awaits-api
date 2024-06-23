import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";
import addKeywords from "ajv-keywords";
import { NextFunction, Request, Response } from "express";

const ajv = addKeywords(
  addFormats(
    new Ajv({
      allErrors: true,
      verbose: true,
    })
  )
);

export function createValidationFromSchema<T>(schema: JSONSchemaType<T>) {
  const validate = ajv.compile(schema);

  return (payload: unknown) => {
    if (validate(payload)) {
      return [];
    }

    const returnval = validate.errors
      ?.map((errorObj) => {
        console.log("error obj", errorObj);
        return `${errorObj.instancePath ? errorObj.instancePath : ""} ${
          errorObj.message
        }`;
      })
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      });

    return returnval;
  };
}

export function validationFactory<T>(jsonSchema: JSONSchemaType<T>) {
  const validator = createValidationFromSchema(jsonSchema);

  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationErrors = validator(req);
      if (validationErrors?.length) {
        const message = validationErrors.join(", ");
        res.status(400);
        throw new Error(message);
      }
    } catch (error) {
      next(error);
    }
  };
}
