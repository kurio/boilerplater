import cmd from "commander";
import logger from "winston";

logger.configure({
  transports: new logger.transports.Console(),
  format: logger.format.simple(),
  level: "info"
});

cmd.option("-v, --verbose", "set the output to be verbose");

cmd.command("ping").action(() => {
  logger.info("pong");
});

cmd.on("option:verbose", () => {
  logger.level = "silly";
});

if (!process.argv.slice(2).length) {
  cmd.outputHelp();
  process.exit(1);
}

export default cmd;
