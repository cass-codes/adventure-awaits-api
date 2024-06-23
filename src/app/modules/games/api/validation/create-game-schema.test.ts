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
      screen: "screen",
      character: {
        characterName: "name",
        class: UserClass.bard,
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

    it.each(["day", "screen", "character"])(
      "should fail when %s is missing",
      (field) => {
        const body = { ...validBody };
        //@ts-expect-error implicit any
        delete body[field];
        const validationErrors = validator({
          body,
        });

        expect(validationErrors).toEqual([
          `/body must have required property '${field}'`,
        ]);
      }
    );

    it.each([
      ["userId", 1, "string"],
      ["userId", {}, "string"],
      ["day", "string", "number"],
      ["day", {}, "number"],
      ["screen", 1, "string"],
      ["screen", {}, "string"],
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

    it('should succeed when "userId" is missing', () => {
      const body = { ...validBody };
      delete body.userId;
      const validationErrors = validator({
        body,
      });

      expect(validationErrors).toEqual([]);
    });
  });

  describe("character", () => {
    it.each(["characterName", "class", "stats", "money"])(
      "should fail when %s is missing",
      (field) => {
        const body = { ...validBody };
        //@ts-expect-error implicit any
        delete body.character[field];
        const validationErrors = validator({
          body,
        });

        expect(validationErrors).toEqual([
          `/body/character must have required property '${field}'`,
        ]);
      }
    );

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
        body.character.class = validClass;
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
    ])("should fail when %s is missing", (field) => {
      const body = { ...validBody };
      //@ts-expect-error implicit any
      delete body.character.stats[field];
      const validationErrors = validator({
        body,
      });

      expect(validationErrors).toEqual([
        `/body/character/stats must have required property '${field}'`,
      ]);
    });

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
    it.each(["gold", "pennies"])("should fail when %s is missing", (field) => {
      const body = { ...validBody };
      //@ts-expect-error implicit any
      delete body.character.money[field];
      const validationErrors = validator({
        body,
      });

      expect(validationErrors).toEqual([
        `/body/character/money must have required property '${field}'`,
      ]);
    });

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