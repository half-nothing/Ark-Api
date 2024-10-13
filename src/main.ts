import path from "path";
import alias from "module-alias";

alias(path.resolve(__dirname, "../"));

import type {Request, Response} from "express";
import express from "express";
import cors from "cors";
import {connectionLogger, logger} from "@/base/logger";
import {Config} from "@/base/config";
import {FileUtils} from "@/utils/fileUtils";
import {CommonMiddleWare} from "@/middleware/commonMiddleWare";
import {initCatcher} from "@/base/catcher";
import process from "node:process";
import https from "https";
import fs from "fs";
import http from "http";
import {Version, VersionType} from "@/manager/version";
import mainConfig = Config.mainConfig;
import checkFileExist = FileUtils.checkFileExist;
import configVersion = Config.configVersion;

const configFileVersion: Version = new Version(mainConfig.configVersion);
const versionType: VersionType = configVersion.checkVersion(configFileVersion);
if (versionType == VersionType.MAJOR_UNMATCHED || versionType == VersionType.MINOR_UNMATCHED) {
    logger.error(`Config version error! Require ${configVersion.version()} but got ${configFileVersion.version()}`);
    process.exit(-1);
} else if (versionType == VersionType.PATCH_UNMATCHED) {
    logger.warn(`Config version not match! Require ${configVersion.version()} but got ${configFileVersion.version()}`);
} else {
    logger.info(`Config file check complete, version check passed, config loading complete`)
}

initCatcher()

const app = express();

app.set('trust proxy', true);
app.use(connectionLogger);
app.use(cors());

app.use(CommonMiddleWare.accessRecord);

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('*', (_: Request, res: Response) => {
    logger.info(`Not router match, redirect to home page ${mainConfig.homePage}`);
    res.redirect(mainConfig.homePage);
});

app.use(CommonMiddleWare.errorHandler);

const port = mainConfig.port;

if (mainConfig.https.enable) {
    if (!checkFileExist(mainConfig.https.keyPath)) {
        logger.error("Can not find certificate key.");
        process.exit(-1);
    }
    if (!checkFileExist(mainConfig.https.crtPath)) {
        logger.error("Can not find certificate crt.");
        process.exit(-1);
    }
    https.createServer({
        key: fs.readFileSync(mainConfig.https.keyPath),
        cert: fs.readFileSync(mainConfig.https.crtPath)
    }, app).listen(port);
    logger.info(`Server running at https://0.0.0.0${port === 443 ? "" : ":" + port}/`);
} else {
    if (mainConfig.https.enableHSTS) {
        logger.error(`If you want to enable HSTS, please enable HTTPS first`);
        process.exit(-1)
    }
    http.createServer(app).listen(port);
    logger.info(`Server running at http://0.0.0.0${port === 80 ? "" : ":" + port}/`);
}
