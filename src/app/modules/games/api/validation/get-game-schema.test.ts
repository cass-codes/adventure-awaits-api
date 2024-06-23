import { createValidationFromSchema } from "../../../shared/middleware";
import { getGameSchema } from "./get-game-schema";

describe("Get Game Schema", () => {
  const validator = createValidationFromSchema(getGameSchema);

  it("should not return an error if the userId and gameId are strings", () => {
    const result = validator({
      query: { userId: "123" },
      params: { gameId: "123" },
    });
    expect(result).toEqual([]);
  });

  it("should return an error if the userId is not a string", () => {
    const result = validator({
      query: { userId: 123 },
      params: { gameId: "123" },
    });
    expect(result).toEqual(["/query/userId must be string"]);
  });

  it("should return an error if the userId is not provided", () => {
    const result = validator({
      query: {},
      params: { gameId: "123" },
    });
    expect(result).toEqual(["/query must have required property 'userId'"]);
  });

  it("should return an error if the gameId is not a string", () => {
    const result = validator({
      query: { userId: "123" },
      params: { gameId: 123 },
    });
    expect(result).toEqual(["/params/gameId must be string"]);
  });

  it("should return an error if the gameId is not provided", () => {
    const result = validator({
      query: { userId: "123" },
      params: {},
    });
    expect(result).toEqual(["/params must have required property 'gameId'"]);
  });

  it("should return an error if the query object is not provided", () => {
    const result = validator({
      params: { gameId: "123" },
    });
    expect(result).toEqual([" must have required property 'query'"]);
  });

  it("should return an error if the params object is not provided", () => {
    const result = validator({
      query: { userId: "123" },
    });
    expect(result).toEqual([" must have required property 'params'"]);
  });

  it("should return an error if the query object is not an object", () => {
    const result = validator({
      query: "string",
      params: { gameId: "123" },
    });
    expect(result).toEqual(["/query must be object"]);
  });

  it("should return an error if the params object is not an object", () => {
    const result = validator({
      query: { userId: "123" },
      params: "string",
    });
    expect(result).toEqual(["/params must be object"]);
  });

  it("should return an error if the query object has additional properties", () => {
    const result = validator({
      query: { userId: "123", additional: "property" },
      params: { gameId: "123" },
    });
    expect(result).toEqual(["/query must NOT have additional properties"]);
  });
});
