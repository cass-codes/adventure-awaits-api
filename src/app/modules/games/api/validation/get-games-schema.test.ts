import { createValidationFromSchema } from "../../../shared/middleware";
import { getGamesSchema } from "./get-games-schema";

describe("Get Games Schema", () => {
  const validator = createValidationFromSchema(getGamesSchema);

  it("should succeed if the userId is a string", () => {
    const result = validator({
      query: { userId: "123" },
    });
    expect(result).toEqual([]);
  });

  it("should return an error if the userId is not a string", () => {
    const result = validator({
      query: { userId: 123 },
    });
    expect(result).toEqual(["/query/userId must be string"]);
  });

  it("should return an error if the userId is not provided", () => {
    const result = validator({
      query: {},
    });
    expect(result).toEqual(["/query must have required property 'userId'"]);
  });

  it("should return an error if the query object is not provided", () => {
    const result = validator({});
    expect(result).toEqual([" must have required property 'query'"]);
  });

  it("should return an error if the query object is not an object", () => {
    const result = validator({
      query: "string",
    });
    expect(result).toEqual(["/query must be object"]);
  });

  it("should return an error if the query object has additional properties", () => {
    const result = validator({
      query: { userId: "123", additional: "property" },
    });
    expect(result).toEqual(["/query must NOT have additional properties"]);
  });
});
