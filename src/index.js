#!/usr/bin/env node
import cmd from "./root";
import { generateNodeServer, generateNodeCli } from "./nodejs";
import generateGo from "./go";

cmd
  .command("node-server <dest>")
  .description("generate Node.js web server app")
  .option("--packageName [name]")
  .action(async (dest, opt) => {
    const { packageName } = opt;

    await generateNodeServer(dest, packageName);
  });

cmd
  .command("node-cli <dest>")
  .description("generate Node.js CLI app")
  .option("--packageName [name]")
  .action(async (dest, opt) => {
    const { packageName } = opt;

    await generateNodeCli(dest, packageName);
  });

cmd
  .command("go <dest>")
  .description("generate Go app")
  .option("--packageName [name]")
  .action(async (dest, opt) => {
    const { packageName } = opt;

    await generateGo(dest, packageName);
  });

if (!process.argv.slice(2).length) {
  cmd.outputHelp();
  process.exit(1);
}

cmd.parse(process.argv);
