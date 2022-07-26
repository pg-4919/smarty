const fs = require("fs");
const path = require("path");
const root = require("./root.js");

function updateBotData() {
    const { exec } = require("child_process");

    exec("")
}

module.exports = {
    read(datafile) {
        return fs.readFileSync(`${root}/data/${datafile}`);
    },
    write(datafile, contents) {
        return fs.writeFileSync(`${root}/data/${datafile}`, contents);
    }
}