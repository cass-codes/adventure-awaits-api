import { UserClass } from "../../../../../shared/types/Character";
import { createValidationFromSchema } from "../../../shared/middleware/ajv-validation";
import { createGameSchema, type CreateGameDto } from "./create-game-schema";

describe("CreateGameSchema", () => {
  const validator = createValidationFromSchema(createGameSchema);
  let validBody: CreateGameDto;

  beforeEach(() => {
    validBody = {
      userId: "123",
      day: 1,
      screenId: "screen",
      character: {
        characterName: "name",
        class: UserClass.Bard,
        stats: {
          goodness: 1,
          cleverness: 1,
          sneakiness: 1,
          brawn: 1,
          magic: 1,
          charm: 1,
        },
        money: {
          gold: 10,
          pennies: 1,
        },
      },
    };
  });
  describe("top level", () => {
    it("should pass with all valid fields", () => {
      const validationErrors = validator({
        body: validBody,
      });

      expect(validationErrors).toEqual([]);
    });

    it.each([
      ["userId", 1, "string"],
      ["userId", {}, "string"],
      ["day", "string", "number"],
      ["day", {}, "number"],
      ["screenId", 1, "string"],
      ["screenId", {}, "string"],
      ["character", "string", "object"],
      ["character", 1, "object"],
    ])('should fail when "%s" is the wrong type', (field, value, validType) => {
      const body = { ...validBody, [field]: value };
      const validationErrors = validator({
        body,
      });

      expect(validationErrors).toEqual([`/body/${field} must be ${validType}`]);
    });

    it('should fail when "day" is less than 0', () => {
      const body = { ...validBody, day: -1 };
      const validationErrors = validator({
        body,
      });

      expect(validationErrors).toEqual(["/body/day must be >= 0"]);
    });
  });

  describe("character", () => {
    it.each([
      ["characterName", 1, "string"],
      ["characterName", {}, "string"],
      ["stats", "string", "object"],
      ["stats", 1, "object"],
      ["money", "string", "object"],
      ["money", 1, "object"],
    ])('should fail when "%s" is the wrong type', (field, value, validType) => {
      const body = { ...validBody };
      //@ts-expect-error implicit any
      body.character[field] = value;
      const validationErrors = validator({
        body,
      });

      expect(validationErrors).toEqual([
        `/body/character/${field} must be ${validType}`,
      ]);
    });

    it.each(Object.values(UserClass))(
      "should succeed with class as %s",
      (validClass) => {
        const body = { ...validBody };
        body.character = { ...body.character, class: validClass };
        const validationErrors = validator({
          body,
        });

        expect(validationErrors).toEqual([]);
      }
    );

    it("should fail if class is not a valid UserClass", () => {
      const body = { ...validBody };
      //@ts-expect-error implicit any
      body.character.class = "invalid";
      const validationErrors = validator({
        body,
      });

      expect(validationErrors).toEqual([
        `/body/character/class must be equal to one of the allowed values`,
      ]);
    });
  });

  describe("stats", () => {
    it.each([
      ["goodness", "cleverness", "sneakiness", "brawn", "magic", "charm"],
    ])('should fail when "%s" is less than -5', (field) => {
      const body = { ...validBody };
      //@ts-expect-error implicit any
      body.character.stats[field] = -6;
      const validationErrors = validator({
        body,
      });

      expect(validationErrors).toEqual([
        `/body/character/stats/${field} must be >= -5`,
      ]);
    });

    it.each([
      ["goodness", "cleverness", "sneakiness", "brawn", "magic", "charm"],
    ])('should fail when "%s" is greater than 5', (field) => {
      const body = { ...validBody };
      //@ts-expect-error implicit any
      body.character.stats[field] = 6;
      const validationErrors = validator({
        body,
      });

      expect(validationErrors).toEqual([
        `/body/character/stats/${field} must be <= 5`,
      ]);
    });
  });

  describe("money", () => {
    it.each(["gold", "pennies"])(
      'should fail when "%s" is less than 0',
      (field) => {
        const body = { ...validBody };
        //@ts-expect-error implicit any
        body.character.money[field] = -1;
        const validationErrors = validator({
          body,
        });

        expect(validationErrors).toEqual([
          `/body/character/money/${field} must be >= 0`,
        ]);
      }
    );
  });
});
