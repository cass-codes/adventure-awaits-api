import { JSONSchemaType } from "ajv";

interface GetGamesSchema {
  query: {
    userId: string;
  };
}

export const getGamesSchema: JSONSchemaType<GetGamesSchema> = {
  type: "object",
  additionalProperties: true,
  required: ["query"],
  properties: {
    query: {
      type: "object",
      additionalProperties: false,
      properties: {
        userId: { type: "string" },
      },
      required: ["userId"],
    },
  },
};
