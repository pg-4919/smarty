const clean = require("./clean.js");

module.exports = (content, length) => {
    const cleaned = clean(content);
    return cleaned.slice(0, length) + (content.length > length ? "..." : " ");
}
