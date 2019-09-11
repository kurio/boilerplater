import { mkdtempSync } from "fs";
import { tmpdir } from "os";
import path from "path";
import axios from "axios";
import fsExtra from "fs-extra";
import unzipper from "unzipper";
import logger from "winston";

export default async function downloadTemplate(
  repoName,
  dirPath,
  commit = "master"
) {
  const zipUrl = `https://github.com/kurio/${repoName}/archive/${commit}.zip`;
  const tmpDir = mkdtempSync(tmpdir());

  logger.debug(`Downloading ${zipUrl} into ${tmpDir}`);

  const response = await axios({
    url: zipUrl,
    method: "GET",
    responseType: "stream"
  });

  await response.data.pipe(unzipper.Extract({ path: tmpDir })).promise();

  const repoDir = path.join(tmpDir, `${repoName}-${commit}`);

  logger.debug(`Renaming ${repoDir} to ${dirPath}`);
  await fsExtra.move(repoDir, dirPath);
}
