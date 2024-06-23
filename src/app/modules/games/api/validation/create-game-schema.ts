import { JSONSchemaType } from "ajv";
import { validationFunction } from "../../../shared/middleware/ajv-validation";

const statsSchema = {
  type: "number",
  min: -5,
  max: 5,
};

interface GameSchema {
  userId: string;
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
}

const createGameSchema: JSONSchemaType<GameSchema> = {
  type: "object",
  additionalProperties: false,
  properties: {
    userId: { type: "string" }, // will be hooked up at some point but at the moment can just be blank
    day: { type: "number", min: 0 },
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
            goodness: statsSchema,
            cleverness: statsSchema,
            sneakiness: statsSchema,
            brawn: statsSchema,
            magic: statsSchema,
            charm: statsSchema,
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
            gold: { type: "number", min: 0 },
            pennies: { type: "number", min: 0 },
          },
          required: ["gold", "pennies"],
        },
      },
      required: ["characterName", "class", "stats", "money"],
    },
  },
  required: ["day", "screen", "character"],
};

const createGameValidator = validationFunction(createGameSchema);

export default createGameValidator;
