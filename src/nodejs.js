import path from "path";
import { prompt } from "enquirer";
import replace from "replace-in-file";
import validatePackage from "validate-npm-package-name";
import logger from "winston";
import downloadTemplate from "./download";
import {
  boilerplateNodejsCLICommit,
  boilerplateNodejsServerCommit
} from "./const";

async function generateCode(dest, packageName, repoName) {
  let pkgName = packageName;
  if (!pkgName) {
    const input = await prompt({
      type: "input",
      name: "name",
      message: "Package name",
      required: true,
      validate: value => {
        const valid = validatePackage(value);
        return valid.validForNewPackages || valid.validForOldPackages;
      }
    });

    pkgName = input.name;
  }

  const dirPath = path.join("./", dest);

  let defaultAppName;
  let repoCommit;

  switch (repoName) {
    case "boilerplate-server-nodejs":
      defaultAppName = "node\\.js server";
      repoCommit = boilerplateNodejsServerCommit;
      break;

    case "boilerplate-cli-nodejs":
      defaultAppName = "node\\.js cli";
      repoCommit = boilerplateNodejsCLICommit;
      break;

    default:
      throw new Error(`invalid repo name: ${repoName}`);
  }

  try {
    await downloadTemplate(repoName, dirPath, repoCommit);
  } catch (e) {
    logger.error(`Cannot download template: ${e}`);
  }

  const names = pkgName.split("/");
  const appName = names[names.length - 1];

  const replacements = [
    replace({
      files: path.join(dirPath, "package.json"),
      from: /app/,
      to: pkgName.toLowerCase()
    }),
    replace({
      files: path.join(dirPath, "README.md"),
      from: new RegExp(defaultAppName, "gi"),
      to: appName
    })
  ];

  await Promise.all(replacements);
}

export async function generateNodeServer(dest, packageName) {
  return generateCode(dest, packageName, "boilerplate-server-nodejs");
}

export async function generateNodeCli(dest, packageName) {
  return generateCode(dest, packageName, "boilerplate-cli-nodejs");
}
