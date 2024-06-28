import { JSONSchemaType } from "ajv";
import { Request } from "express";

interface GetScreenSchema {
  query: {
    gameId: string;
    userId: string;
  };
  params: {
    screenId: string;
  };
  body: {
    saveValues?: {
      savePath: string;
      saveValue: string;
    }[];
  };
}

export type GetScreenDTO = Request & GetScreenSchema;

export const getScreenSchema: JSONSchemaType<GetScreenSchema> = {
  type: "object",
  additionalProperties: true,
  required: ["query", "params", "body"],
  properties: {
    query: {
      type: "object",
      additionalProperties: false,
      required: ["gameId", "userId"],
      properties: { gameId: { type: "string" }, userId: { type: "string" } },
    },
    params: {
      type: "object",
      additionalProperties: false,
      properties: {
        screenId: { type: "string" },
      },
      required: ["screenId"],
    },
    body: {
      type: "object",
      additionalProperties: false,
      properties: {
        saveValues: {
          type: "array",
          nullable: true,
          items: {
            type: "object",
            additionalProperties: false,
            required: ["savePath", "saveValue"],
            properties: {
              savePath: { type: "string" },
              saveValue: { type: "string" },
            },
          },
        },
      },
    },
  },
};
