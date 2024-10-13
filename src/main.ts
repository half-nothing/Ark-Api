import path from "path";
import alias from "module-alias";

alias(path.resolve(__dirname, "../"));

import express from "express";
import cors from "cors";

const app = express();

app.set('trust proxy', true);

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// app.use('*', (_: Request, res: Response) => {
//     logger.info(`Not router match, redirect to home page ${serverConfig.homePage}`);
//     res.redirect(serverConfig.homePage);
// });
