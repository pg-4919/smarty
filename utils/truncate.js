const clean = require("./clean.js");

module.exports = (content, length) => 
    content.slice(0, length) + (content.length > length ? "..." : "");