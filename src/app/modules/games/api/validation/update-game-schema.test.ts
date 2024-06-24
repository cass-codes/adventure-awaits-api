import { createValidationFromSchema } from "../../../shared/middleware";
import { UpdateGameDto, updateGameSchema } from "./update-game-schema";

describe("Update Game Schema", () => {
  const validator = createValidationFromSchema(updateGameSchema);
  let validBody: UpdateGameDto;

  beforeEach(() => {
    validBody = {
      day: 1,
      screen: "screen",
      character: {
        stats: {
          goodness: 1,
          cleverness: 2,
          sneakiness: 3,
          brawn: 4,
          magic: -1,
          charm: -2,
        },
        money: {
          gold: 1,
          pennies: 2,
        },
        relationships: {
          Lyra: {
            dayMet: 1,
            relationshipValue: 1,
          },
        },
      },
    };
  });

  describe("top level properties", () => {
    it("should pass with a valid body", () => {
      const errors = validator({ body: validBody, params: { gameId: "1" } });
      expect(errors).toEqual([]);
    });

    it("should fail without a body or params", () => {
      expect(validator({})).toEqual([
        " must have required property 'body'",
        " must have required property 'params'",
      ]);
    });

    it("should fail without a body", () => {
      expect(validator({ params: { gameId: "123" } })).toEqual([
        " must have required property 'body'",
      ]);
    });

    it("should fail without a gameId", () => {
      expect(validator({ body: validBody, params: {} })).toEqual([
        "/params must have required property 'gameId'",
      ]);
    });

    it('should fail with an additional property "foo"', () => {
      expect(
        validator({
          body: { ...validBody, foo: "bar" },
          params: { gameId: "123" },
        })
      ).toEqual(["/body must NOT have additional properties"]);
    });
  });
});
