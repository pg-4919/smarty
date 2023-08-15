const utils = require("../utils/utils.js");

module.exports = async reaction => {
    const { client, emoji, message } = reaction;
    const starred = await message.guild.channels.fetch(client.config?.channels.starred);

    await reaction.fetch().catch(console.log);
    if (!["📌", "⭐"].includes(emoji.name)) return;

    const reactions = message.reactions.cache;
    const pins = reactions.find(reaction => reaction.emoji.name === "📌");
    if (pins?.me) return;

    await message.react("📌");
    await utils.clone(message, starred, true);
    
    return;
}