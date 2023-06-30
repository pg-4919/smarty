const utils = require("./utils.js");

module.exports = (content, length) => 
    utils.clean(content).slice(0, length) + (content.length > length ? "..." : "");