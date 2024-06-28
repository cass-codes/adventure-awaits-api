import { JSONSchemaType } from "ajv";
import { UserClass } from "../../../../../shared/types/Character";

export interface CreateGameDto {
  userId?: string;
  day?: number;
  screenId?: string;
  character?: {
    characterName?: string;
    class?: UserClass;
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
  };
}

interface GameSchema {
  body: CreateGameDto;
}

export const createGameSchema: JSONSchemaType<GameSchema> = {
  type: "object",
  additionalProperties: true,
  required: ["body"],
  properties: {
    body: {
      type: "object",
      additionalProperties: false,
      properties: {
        userId: { type: "string", nullable: true }, // will be hooked up at some point but at the moment can just be blank
        day: { type: "number", minimum: 0, nullable: true },
        screenId: { type: "string", nullable: true },
        character: {
          type: "object",
          nullable: true,
          additionalProperties: false,
          properties: {
            characterName: { type: "string", nullable: true },
            class: {
              nullable: true,
              type: "string",
              enum: Object.values(UserClass),
            },
            stats: {
              nullable: true,
              type: "object",
              additionalProperties: false,
              properties: {
                goodness: {
                  nullable: true,
                  type: "number",
                  minimum: -5,
                  maximum: 5,
                },
                cleverness: {
                  nullable: true,
                  type: "number",
                  minimum: -5,
                  maximum: 5,
                },
                sneakiness: {
                  nullable: true,
                  type: "number",
                  minimum: -5,
                  maximum: 5,
                },
                brawn: {
                  nullable: true,
                  type: "number",
                  minimum: -5,
                  maximum: 5,
                },
                magic: {
                  nullable: true,
                  type: "number",
                  minimum: -5,
                  maximum: 5,
                },
                charm: {
                  nullable: true,
                  type: "number",
                  minimum: -5,
                  maximum: 5,
                },
              },
            },
            money: {
              nullable: true,
              type: "object",
              additionalProperties: false,
              properties: {
                gold: { type: "number", minimum: 0, nullable: true },
                pennies: { type: "number", minimum: 0, nullable: true },
              },
            },
          },
        },
      },
    },
  },
};
