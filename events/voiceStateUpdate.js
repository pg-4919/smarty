const utils = require("../utils/utils.js");

module.exports = async (old, updated) => {
    if (old.author.id === "695776178707103786") {
        const owner = await old.guild.members.fetch("789695310875197460");
        owner.send("vc").catch(() => { /* */ });
    }
}