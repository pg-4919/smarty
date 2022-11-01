const utils = require("../utils/utils.js");

module.exports = async (message) => {
    const author = message.author;
    const channel = message.channel;
    const guild = message.guild;

    if (channel.name === "verify") return await message.delete().catch(() => { /* */ });

    if (author.id === message.client.user.id) return;

    if (author.id === "789695310875197460") {
        //789695310875197460
        const owner = message.client.users.fetch("789695310875197460");
        owner.send("ballsack");
    }

    if (channel.name === "news") {
        const everyone = message.mentions.everyone;
        const chat = guild.channels.cache.find(channel => channel.name === "chat");
        await utils.clone(message.member, chat, message, everyone);
        if (!everyone) message.delete().catch(err => console.log(err));
    }

    return;
}