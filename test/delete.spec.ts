import { httpRequest } from "./helper";

const body = {
  test: "from delete",
};

describe("WS DELETE REQUEST", () => {
  test("should respond with msg.", async () => {
    const k = await httpRequest<object>(
      "/api/ws",
      "test",
      "/api/delete",
      "delete",
      body
    ).catch((e: Error) => {
      return {
        msg: e.message,
      };
    });

    expect(k).toEqual({
      msg: body.test,
    });
  });

  test("should fail with status code 404.", async () => {
    const k = await httpRequest<object>(
      "/api/ws",
      "test",
      "/api/no-delete",
      "delete",
      body
    ).catch((e: Error) => {
      return {
        msg: e.message,
      };
    });

    expect(k).toEqual({ msg: "Request failed with status code 404" });
  });

  test("should fail with invalid ws event.", async () => {
    const k = await httpRequest<object>(
      "/api/ws",
      "no-test",
      "/api/delete",
      "delete",
      body
    ).catch((e: Error) => {
      return {
        msg: e.message,
      };
    });

    expect(k).toEqual({ msg: "Invalid WS event." });
  });
});
