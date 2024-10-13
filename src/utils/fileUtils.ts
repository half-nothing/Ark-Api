import {accessSync, constants, writeFileSync, mkdirSync, WriteFileOptions} from "fs";

/**
 * @namespace FileUtils
 * @desc File system operation class
 * @export
 */
export namespace FileUtils {
    /**
     * @function
     * @desc Check if a directory exists
     * @desc If it does not exist and createDir is true, create the directory
     * @param path {string} the directory to check
     * @param createDir {boolean} If the directory does not exist, whether to create a directory
     * @param callback {Runnable<boolean>} callback function
     * @return {true} the directory exist
     * @return {false} the directory does not exist
     * @return {void} No value is returned when a callback function is passed
     * @version 1.0.0
     * @since 1.0.0
     * @export
     */
    export function checkDirExist(path: string, createDir: boolean = false, callback?: Runnable<boolean>): void | boolean {
        try {
            accessSync(path, constants.F_OK);
            return callback ? callback(true) : true;
        } catch (_) {
            if (createDir) {
                mkdirSync(path, {recursive: true});
            }
            return callback ? callback(false) : false;
        }
    }

    /**
     * @function
     * @desc Check if a file exists
     * @desc If it does not exist and createFile is true, create the file and write the content set by data
     * @desc options is the option when the file is written
     * @param path {string} the path of the file to check
     * @param createFile {boolean} If the file does not exist, whether to create a file
     * @param data {string} The contents of the file to be written are empty by default
     * @param options {WriteFileOptions} options when writing to a file default is utf-8
     * @param callback {Runnable<boolean>} callback function
     * @return {true} the file exists
     * @return {false} the file does not exist
     * @return {void} No value is returned when a callback function is passed
     * @version 1.0.0
     * @since 1.0.0
     * @export
     */
    export function checkFileExist(path: string, createFile: boolean = false, data: string = "",
                                   options: WriteFileOptions = 'utf-8', callback?: Runnable<boolean>): void | boolean {
        try {
            accessSync(path, constants.F_OK);
            return callback ? callback(true) : true;
        } catch (_) {
            if (createFile) {
                writeFileSync(path, data, options);
            }
            return callback ? callback(false) : false;
        }
    }
}
