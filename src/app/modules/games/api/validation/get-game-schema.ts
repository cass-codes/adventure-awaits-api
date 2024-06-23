import { JSONSchemaType } from "ajv";

interface GetGameSchema {
  query: {
    userId: string;
  };
  params: {
    gameId: string;
  };
}

export const getGameSchema: JSONSchemaType<GetGameSchema> = {
  type: "object",
  additionalProperties: true,
  required: ["query", "params"],
  properties: {
    query: {
      type: "object",
      additionalProperties: false,
      properties: {
        userId: { type: "string" },
      },
      required: ["userId"],
    },
    params: {
      type: "object",
      additionalProperties: false,
      properties: {
        gameId: { type: "string" },
      },
      required: ["gameId"],
    },
  },
};
