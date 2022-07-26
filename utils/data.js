const fs = require("fs");
const path = require("path");
const root = require("./root.js");


module.exports = {
    updateRepo() {
        const exec = require("child_process").exec;

        return new Promise((resolve, reject) => {
            exec(`cd ${root} && cd ../ && ./update-repo`, (err, out) => {
                if (error) return reject(error);
                resolve(stdout);
            });
        })
    }
}