const utils = require("../utils/utils.js");

module.exports = async (reaction, user) => {
    const message = reaction.message;
    const guild = message.guild;
    const starred = guild.channels.cache.find(channel => channel.name === "starred");

    try { await reaction.fetch() } catch (err) { return err };
    if (reaction.emoji.name !== "📌" || message.reactions.cache.find(reaction => reaction.name === "pushpin")?.count > 1 || reaction.me || typeof starred === undefined) return;
    await utils.clone(message.member, starred, message, true);
    return message.react("✅");
}