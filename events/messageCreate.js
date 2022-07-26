const utils = require("../utils/utils.js");

module.exports = async (message) => {
    const author = message.author;

    if (author.id === client.user.id) return;

    if (message.channel.name === "news") {
        const chat = message.guild.channels.cache.find(channel => channel.name === "chat");
        await require(`${utils.root}/utils/clone.js`).clone(message.member, chat, message);
        if (!message.mentions.everyone) message.delete().catch(() => {/**/});
    }

    utils.stats.increment(message.guild, author, "msgs_sent", 1);
}