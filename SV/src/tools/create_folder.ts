const fs = require("fs");
class createFolder {
    folder(location:any) {
        const path = location;
        fs.access(path, (error: any) => {
            if (error) {
                fs.mkdir(path, (error: any) => {
                    if (error) {
                        console.log(error);
                    } else {
                        // console.log("New Directory created successfully !!");
                    }
                });
            } else {
                // console.log("Given Directory already exists !!");
            }
        });
    }
}
const createFolders = new createFolder();
export default createFolders.folder;
