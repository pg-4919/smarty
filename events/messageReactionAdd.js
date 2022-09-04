const utils = require("../utils/utils.js");

module.exports = async (reaction, user) => {
    const message = reaction.message;
    const guild = message.guild;
    const starred = guild.channels.cache.find(channel => channel.name === "starred");

    try { await reaction.fetch() } catch (err) { return err };
    if (reaction.emoji.name !== "📌" || reaction.me || typeof starred === undefined) return;
    await utils.clone(guild.members.cache.get(user.id), starred, message);
    return message.react("✅");
}