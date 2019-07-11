import path from "path";
import { prompt } from "enquirer";
import replace from "replace-in-file";
import validatePackage from "validate-npm-package-name";
import logger from "winston";
import downloadTemplate from "./download";

async function generateCode(dest, packageName, repoName, defaultAppName) {
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

  try {
    await downloadTemplate(repoName, dirPath);
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
  return generateCode(
    dest,
    packageName,
    "boilerplate-server-nodejs",
    "node\\.js server"
  );
}

export async function generateNodeCli(repoName, dest, packageName) {
  return generateCode(
    dest,
    packageName,
    "boilerplate-cli-nodejs",
    "node\\.js cli"
  );
}
