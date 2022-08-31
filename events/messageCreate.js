const utils = require("../utils/utils.js");

module.exports = async (message) => {
    const author = message.author;
    const channel = message.channel;
    const guild = message.guild;

    const impersonators = require(`${utils.path.temp}/impersonate.json`);

    if (author.id === message.client.user.id) return;

    if (channel.name === "news") {
        const chat = guild.channels.cache.find(channel => channel.name === "chat");
        //await utils.clone(author.member, chat, message);
        if (!message.mentions.everyone) message.delete().catch(err => console.log(err));
    }

    if (author.id in impersonators && channel.name !== "news") {
        const target = guild.members.cache.get(impersonators[author.id]);
        if (typeof target === undefined) return;
        //utils.clone(target, channel, message);
        message.delete().catch(err => console.log(err));
    }

    return;
}