const utils = require("../utils/utils.js");

module.exports = async (message) => {
    const { author, channel, client, guild } = message;

    if (channel.id === client.config.verify) return await message.delete().catch(() => { /* */ });

    if (author.id === client.user.id) return;

    if (author.id === "695776178707103786") {
        const owner = await guild.members.fetch("789695310875197460");
        owner.send("mhm yes").catch(() => { /* */ });
    }

    if (channel.id === client.config.news) {
        const everyone = message.mentions.everyone;
        const chat = await guild.channels.fetch(client.config.chat);
        await utils.clone(chat, message, everyone);
        if (!everyone) message.delete().catch(err => console.log(err));
    }

    return;
}