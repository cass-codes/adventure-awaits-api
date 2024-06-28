import { createValidationFromSchema } from "../../../shared/middleware";
import { getScreenSchema } from "./get-screen-schema";

describe("getScreenSchema", () => {
  const validator = createValidationFromSchema(getScreenSchema);

  it("should not return an error if everything is valid", () => {
    const result = validator({
      params: { screenId: "123" },
      query: { gameId: "123", userId: "123" },
      body: {
        saveValues: [
          { savePath: "path1", saveValue: "value1" },
          { savePath: "path2", saveValue: "value2" },
        ],
      },
    });
    expect(result).toEqual([]);
  });

  it("should return an error if the screenId is not a string", () => {
    const result = validator({
      params: { screenId: 123 },
      body: {},
      query: { gameId: "123", userId: "123" },
    });
    expect(result).toEqual(["/params/screenId must be string"]);
  });

  it("should return an error if the screenId is not provided", () => {
    const result = validator({
      params: {},
      query: { gameId: "123", userId: "123" },
      body: {},
    });
    expect(result).toEqual(["/params must have required property 'screenId'"]);
  });

  it("should return an error if the gameId is not a string", () => {
    const result = validator({
      params: { screenId: "123" },
      body: {},
      query: { gameId: 123, userId: "123" },
    });
    expect(result).toEqual(["/query/gameId must be string"]);
  });

  it("should return an error if the gameId is not provided", () => {
    const result = validator({
      params: { screenId: "123" },
      body: {},
      query: { userId: "123" },
    });
    expect(result).toEqual(["/query must have required property 'gameId'"]);
  });

  it("should return an error if the userId is not a string", () => {
    const result = validator({
      params: { screenId: "123" },
      query: { gameId: "123", userId: 123 },
      body: {},
    });
    expect(result).toEqual(["/query/userId must be string"]);
  });

  it("should return an error if the userId is not provided", () => {
    const result = validator({
      params: { screenId: "123" },
      body: {},
      query: { gameId: "123" },
    });
    expect(result).toEqual(["/query must have required property 'userId'"]);
  });

  it("should return an error if the params object is not provided", () => {
    const result = validator({
      query: { gameId: "123", userId: "123" },
      body: {},
    });
    expect(result).toEqual([" must have required property 'params'"]);
  });

  it("should return an error if the query object is not provided", () => {
    const result = validator({
      params: { screenId: "123" },
      body: {},
    });
    expect(result).toEqual([" must have required property 'query'"]);
  });

  it("should return an error if the params object is not an object", () => {
    const result = validator({
      params: "123",
      query: { gameId: "123", userId: "123" },
      body: {},
    });
    expect(result).toEqual(["/params must be object"]);
  });

  it("should return an error if the query object is not an object", () => {
    const result = validator({
      params: { screenId: "123" },
      query: "123",
      body: {},
    });
    expect(result).toEqual(["/query must be object"]);
  });
  it("should succeed if the body is an empty object", () => {
    const result = validator({
      params: { screenId: "123" },
      query: { gameId: "123", userId: "123" },
      body: {},
    });
    expect(result).toEqual([]);
  });
  it("should return an error if saveValues is not an array", () => {
    const result = validator({
      params: { screenId: "123" },
      query: { gameId: "123", userId: "123" },
      body: { saveValues: {} },
    });
    expect(result).toEqual(["/body/saveValues must be array"]);
  });
  it("should return an error if saveValues is not an array of objects", () => {
    const result = validator({
      params: { screenId: "123" },
      query: { gameId: "123", userId: "123" },
      body: { saveValues: ["string"] },
    });
    expect(result).toEqual(["/body/saveValues/0 must be object"]);
  });
  it("should return an error if saveValues is not an array of objects with savePath and saveValue", () => {
    const result = validator({
      params: { screenId: "123" },
      query: { gameId: "123", userId: "123" },
      body: { saveValues: [{ savePath: "path1" }] },
    });
    expect(result).toEqual([
      "/body/saveValues/0 must have required property 'saveValue'",
    ]);
  });
  it("should return an error if saveValues is not an array of objects with savePath and saveValue", () => {
    const result = validator({
      params: { screenId: "123" },
      query: { gameId: "123", userId: "123" },
      body: { saveValues: [{ saveValue: "value1" }] },
    });
    expect(result).toEqual([
      "/body/saveValues/0 must have required property 'savePath'",
    ]);
  });
  it("should return an error if saveValues is not an array of objects with savePath and saveValue", () => {
    const result = validator({
      params: { screenId: "123" },
      query: { gameId: "123", userId: "123" },
      body: { saveValues: [{ savePath: "path1", saveValue: 1 }] },
    });
    expect(result).toEqual(["/body/saveValues/0/saveValue must be string"]);
  });
});
