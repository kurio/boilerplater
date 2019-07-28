import fs from "fs";
import path from "path";
import { URL } from "url";
import { promisify } from "util";
import { prompt } from "enquirer";
import replace from "replace-in-file";
import logger from "winston";
import downloadTemplate from "./download";

export default async function generateGo(dest, packageName) {
  let pkgName = packageName;
  if (!pkgName) {
    const input = await prompt({
      type: "input",
      name: "name",
      message: "Package name",
      required: true,
      validate: value => {
        const pkgUrl = `http://${value}`;
        let urlParts;

        try {
          urlParts = new URL(pkgUrl);
        } catch (e) {
          return false;
        }

        return (
          urlParts.pathname !== "/" &&
          urlParts.username === "" &&
          urlParts.password === "" &&
          urlParts.search === "" &&
          urlParts.port === "" &&
          urlParts.hash === ""
        );
      }
    });

    pkgName = input.name;
  }

  const dirPath = path.join("./", dest);

  try {
    await downloadTemplate("boilerplate-go", dirPath);
  } catch (e) {
    logger.error(`Cannot download template: ${e}`);
  }

  const names = pkgName.split("/");
  const appName = names[names.length - 1];

  const replacements = [
    replace({
      files: path.join(dirPath, "**", "*.go"),
      from: [/github\.com\/kurio\/boilerplate-go/, /goboilerplate/],
      to: [pkgName.toLowerCase(), appName]
    }),
    replace({
      files: path.join(dirPath, "go.mod"),
      from: /github\.com\/kurio\/boilerplate-go/,
      to: pkgName.toLowerCase()
    }),
    replace({
      files: path.join(dirPath, "README.md"),
      from: new RegExp(/Go App/, "gi"),
      to: appName
    })
  ];

  await Promise.all(replacements);

  const rename = promisify(fs.rename);
  await rename(
    path.join(dirPath, "cmd", "app"),
    path.join(dirPath, "cmd", appName)
  );
}
