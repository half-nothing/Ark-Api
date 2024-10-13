export enum VersionType {
    ALL_MATCH,
    PATCH_UNMATCHED,
    MINOR_UNMATCHED,
    MAJOR_UNMATCHED
}

export class Version {
    private readonly _major: number;
    private readonly _minor: number;
    private readonly _patch: number;

    constructor(version: string);
    constructor(major: number, minor: number, patch: number);
    constructor(majorOrVersion: number | string, minor?: number, patch?: number) {
        if (typeof majorOrVersion === "string") {
            const versions = majorOrVersion.split('.');
            this._major = Number(versions[0]);
            this._minor = Number(versions[1]);
            this._patch = Number(versions[2]);
        } else if (minor != undefined && patch != undefined) {
            this._major = majorOrVersion;
            this._minor = minor;
            this._patch = patch;
        } else {
            throw new Error("Invalid arguments provided to Version constructor");
        }
    }

    get major(): number {
        return this._major;
    }

    get minor(): number {
        return this._minor;
    }

    get patch(): number {
        return this._patch;
    }

    version(): string {
        return `${this._major}.${this._minor}.${this._patch}`;
    }

    checkVersion(version: Version): VersionType {
        if (this._major != version._major) {
            return VersionType.MAJOR_UNMATCHED;
        }
        if (this._minor != version._minor) {
            return VersionType.MINOR_UNMATCHED
        }
        if (this._patch != version._patch) {
            return VersionType.PATCH_UNMATCHED;
        }
        return VersionType.ALL_MATCH
    }
}