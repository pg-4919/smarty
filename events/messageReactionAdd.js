const utils = require("../utils/utils.js");

module.exports = async (reaction, user) => {
    console.log(reaction);
    if (reaction.emoji.name !== "pushpin") return;
    const starred = guild.channels.cache.find(channel => channel.name === "starred");
    if (typeof starred === undefined) return;
    return utils.clone(reaction.message.guild.members.cache.get(user.id), starred, reaction.message);
}