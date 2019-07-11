test("It should respond to ping subcommand", async () => {
  const log = jest.spyOn(process.stdout, "write");
  log.mockImplementation(() => {});

  process.argv = ["node", "dist/index.js", "ping"];

  // eslint-disable-next-line global-require
  require("../src/index");

  expect(log.mock.calls).toEqual([["info: pong\n"]]);
});
