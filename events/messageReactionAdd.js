const utils = require("../utils/utils.js");

module.exports = async (reaction, user) => {
    if (reaction.emoji.name !== "pin") return;
    const starred = guild.channels.cache.find(channel => channel.name === "starred");
    utils.clone(reaction.message.guild.members.cache.get(user.id), starred, reaction.message);
}