import {FileUtils} from "@/utils/fileUtils";
import {logger} from "./logger";
import {readFileSync, writeFileSync} from "fs";
import checkDirExist = FileUtils.checkDirExist;
import checkFileExist = FileUtils.checkFileExist;
import * as process from "node:process";
import {Version} from "@/manager/version";

const configList: string[] = [
    "MainConfig.json"
];

if (!checkDirExist("config", true)) {
    logger.error("Config dir not exist, create and exit");
    process.exit(-1);
}

if (!checkDirExist("config/default", true)) {
    logger.error("Default config dir not exist, create and exit");
    process.exit(-1);
}

function checkConfigFile(fileName: string): boolean {
    if (!checkFileExist(`config/${fileName}`)) {
        logger.error(`${fileName} not found, check default config file.`);
        if (!checkFileExist(`config/default/${fileName}`)) {
            logger.error(`${fileName} default file not exist, please download from github, exit process.`);
            process.exit(-1);
        }
        writeFileSync(`config/${fileName}`,
            readFileSync(`config/default/${fileName}`, "utf8"),
            "utf8");
        logger.info(`Copy ${fileName} successfully, please edit config file.`);
        return false;
    }
    logger.debug(`${fileName} checked.`);
    return true;
}

logger.debug("Checking config file");
let exit = false;
configList.forEach((value) => {
    if (!checkConfigFile(value)) {
        exit = true;
    }
});
if (exit) process.exit(-1);
logger.debug("Config file check finish");

export namespace Config {
    export const configVersion: Version = new Version(1, 0, 0);

    export const mainConfig: MainConfig = require("@config/MainConfig.json");
}
