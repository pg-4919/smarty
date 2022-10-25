const utils = require("../utils/utils.js");

module.exports = async (reaction, user) => {
    const message = reaction.message;
    const guild = message.guild;
    const starred = guild.channels.cache.get("998594505559261284");

    try { await reaction.fetch() } catch (err) { return err };

    if (reaction.emoji.name !== "📌") return;
    if (reaction.me) return;
    await message.react("📌");
    await utils.clone(message.member, starred, message, true);
    return;
}