"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class createFolder {
    folder(location) {
        const path = location;
        fs.access(path, (error) => {
            if (error) {
                fs.mkdir(path, (error) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        // console.log("New Directory created successfully !!");
                    }
                });
            }
            else {
                // console.log("Given Directory already exists !!");
            }
        });
    }
}
const createFolders = new createFolder();
exports.default = createFolders.folder;
