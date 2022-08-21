const utils = require("../utils/utils.js");

module.exports = async (message) => {
    //if (message.author.id === "614955640120410168") message.react("1001983320000839750").catch(() => {/* */})
    const author = message.author;

    if (author.id === message.client.user.id) return;

    if (message.channel.name === "news") {
        const chat = message.guild.channels.cache.find(channel => channel.name === "chat");
        await utils.clone(message.member, chat, message);
        if (!message.mentions.everyone) message.delete().catch(err => console.log(err));
    }
}