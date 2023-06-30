const clean = require("./clean.js");

module.exports = (content, length, clean=true) => {
    const cleaned = clean ? clean(content) : content;
    return cleaned.slice(0, length) + (content.length > length ? "..." : "");
}
