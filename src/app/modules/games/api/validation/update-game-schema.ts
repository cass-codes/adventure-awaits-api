import { JSONSchemaType } from "ajv";

export interface UpdateGameDto {
  day?: number;
  screen?: string;
  character?: {
    stats?: {
      goodness?: number;
      cleverness?: number;
      sneakiness?: number;
      brawn?: number;
      magic?: number;
      charm?: number;
    };
    money?: {
      gold?: number;
      pennies?: number;
    };
    relationships?: {
      [key: string]: {
        dayMet: number;
        relationshipValue: number;
      };
    };
  };
}

interface GameSchema {
  body: UpdateGameDto;
}

export const updateGameSchema: JSONSchemaType<GameSchema> = {
  type: "object",
  additionalProperties: true,
  required: ["body"],
  properties: {
    body: {
      type: "object",
      additionalProperties: false,
      properties: {
        day: { type: "number", minimum: 0, nullable: true },
        screen: { type: "string", nullable: true },
        character: {
          type: "object",
          additionalProperties: false,
          nullable: true,
          properties: {
            stats: {
              type: "object",
              nullable: true,
              additionalProperties: false,
              properties: {
                goodness: {
                  type: "number",
                  nullable: true,
                  minimum: -5,
                  maximum: 5,
                },
                cleverness: {
                  type: "number",
                  nullable: true,
                  minimum: -5,
                  maximum: 5,
                },
                sneakiness: {
                  type: "number",
                  nullable: true,
                  minimum: -5,
                  maximum: 5,
                },
                brawn: {
                  type: "number",
                  nullable: true,
                  minimum: -5,
                  maximum: 5,
                },
                magic: {
                  type: "number",
                  nullable: true,
                  minimum: -5,
                  maximum: 5,
                },
                charm: {
                  type: "number",
                  nullable: true,
                  minimum: -5,
                  maximum: 5,
                },
              },
            },
            money: {
              type: "object",
              nullable: true,
              additionalProperties: false,
              properties: {
                gold: { type: "number", minimum: 0, nullable: true },
                pennies: { type: "number", minimum: 0, nullable: true },
              },
            },
            relationships: {
              type: "object",
              nullable: true,
              required: [],
              additionalProperties: {
                type: "object",
                additionalProperties: false,
                properties: {
                  dayMet: { type: "number", minimum: 0 },
                  relationshipValue: { type: "number" },
                },
                required: ["dayMet", "relationshipValue"],
              },
            },
          },
        },
      },
    },
  },
};
