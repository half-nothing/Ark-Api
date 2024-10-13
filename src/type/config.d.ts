type MainConfig = {
    configVersion: string,
    https: {
        enable: boolean,
        enableHSTS: boolean,
        keyPath: string,
        crtPath: string
    },
    callLimit: {
        count: number,
        time: number
    },
    homePage: string,
    port: number
}