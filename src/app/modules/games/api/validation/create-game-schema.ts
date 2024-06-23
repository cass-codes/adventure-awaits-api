import { JSONSchemaType } from "ajv";

export interface GameSchema {
  body: {
    userId?: string;
    day: number;
    screen: string;
    character: {
      characterName: string;
      class: string;
      stats: {
        goodness: number;
        cleverness: number;
        sneakiness: number;
        brawn: number;
        magic: number;
        charm: number;
      };
      money: {
        gold: number;
        pennies: number;
      };
    };
  };
}

const createGameSchema: JSONSchemaType<GameSchema> = {
  type: "object",
  additionalProperties: true,
  required: ["body"],
  properties: {
    body: {
      type: "object",
      additionalProperties: false,
      properties: {
        userId: { type: "string", nullable: true }, // will be hooked up at some point but at the moment can just be blank
        day: { type: "number", minimum: 0 },
        screen: { type: "string" },
        character: {
          type: "object",
          additionalProperties: false,
          properties: {
            characterName: { type: "string" },
            class: { type: "string" }, // TODO Add enum
            stats: {
              type: "object",
              additionalProperties: false,
              properties: {
                goodness: {
                  type: "number",
                  minimum: -5,
                  maximum: 5,
                },
                cleverness: {
                  type: "number",
                  minimum: -5,
                  maximum: 5,
                },
                sneakiness: {
                  type: "number",
                  minimum: -5,
                  maximum: 5,
                },
                brawn: {
                  type: "number",
                  minimum: -5,
                  maximum: 5,
                },
                magic: {
                  type: "number",
                  minimum: -5,
                  maximum: 5,
                },
                charm: {
                  type: "number",
                  minimum: -5,
                  maximum: 5,
                },
              },
              required: [
                "goodness",
                "cleverness",
                "sneakiness",
                "brawn",
                "magic",
                "charm",
              ],
            },
            money: {
              type: "object",
              additionalProperties: false,
              properties: {
                gold: { type: "number", minimum: 0 },
                pennies: { type: "number", minimum: 0 },
              },
              required: ["gold", "pennies"],
            },
          },
          required: ["characterName", "class", "stats", "money"],
        },
      },
      required: ["day", "screen", "character"],
    },
  },
};

export default createGameSchema;
