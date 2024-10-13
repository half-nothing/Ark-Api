import type {Response} from "express";
import {Config} from "@/base/config";


export namespace Utils {
    import mainConfig = Config.mainConfig;

    export function enableHSTS(res: Response): void {
        if (!mainConfig.https.enable || !mainConfig.https.enableHSTS) {
            return
        }
        res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    }
}
