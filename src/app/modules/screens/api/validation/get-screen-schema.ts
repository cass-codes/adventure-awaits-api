import { JSONSchemaType } from "ajv";
import { Request } from "express";

interface GetScreenSchema {
  query: {
    gameId: string;
  };
  params: {
    screenId: string;
  };
}

export type GetScreenDTO = Request & GetScreenSchema;

export const getScreenSchema: JSONSchemaType<GetScreenSchema> = {
  type: "object",
  additionalProperties: true,
  required: ["query", "params"],
  properties: {
    query: {
      type: "object",
      additionalProperties: false,
      required: ["gameId"],
      properties: { gameId: { type: "string" } },
    },
    params: {
      type: "object",
      additionalProperties: false,
      properties: {
        screenId: { type: "string" },
      },
      required: ["screenId"],
    },
  },
};
