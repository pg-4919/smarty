const utils = require("../utils/utils.js");

module.exports = async (message) => {
    const author = message.author;
    const channel = message.channel;
    const guild = message.guild;

    if (channel.id === client.config.verify) return await message.delete().catch(() => { /* */ });

    if (author.id === message.client.user.id) return;

    if (author.id === "695776178707103786") {
        const owner = await guild.members.fetch("789695310875197460");
        owner.send("mhm yes").catch(() => { /* */ });
    }

    if (channel.id = message.client.config.news) {
        const everyone = message.mentions.everyone;
        const chat = await guild.channels.cache.fetch(client.config.chat);
        await utils.clone(message.member, chat, message, everyone);
        if (!everyone) message.delete().catch(err => console.log(err));
    }

    return;
}