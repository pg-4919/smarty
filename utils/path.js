const path = require("path");

module.exports = {
    root: path.parse(require.main.filename).dir,
    assets: `${root}/assets`,
    commands: `${root}/commands`,
    events: `${root}/events`,
    utils: `${root}/utils`,
    temp: `${root}/temp`
}