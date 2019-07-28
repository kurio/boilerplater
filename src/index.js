#!/usr/bin/env node
import cmd from "./root";
import { generateNodeServer, generateNodeCli } from "./nodejs";
import generateGo from "./go";

cmd
  .command("node-server <dest>")
  .option("--packageName [name]")
  .action(async (dest, opt) => {
    const { packageName } = opt;

    await generateNodeServer(dest, packageName);
  });

cmd
  .command("node-cli <dest>")
  .option("--packageName [name]")
  .action(async (dest, opt) => {
    const { packageName } = opt;

    await generateNodeCli(dest, packageName);
  });

cmd
  .command("go <dest>")
  .option("--packageName [name]")
  .action(async (dest, opt) => {
    const { packageName } = opt;

    await generateGo(dest, packageName);
  });

cmd.parse(process.argv);
