const path = require("path");

const root = path.parse(require.main.filename).dir;

module.exports = {
    root: root,
    assets: `${root}/assets`,
    commands: `${root}/commands`,
    events: `${root}/events`,
    utils: `${root}/utils`
}