const utils = require("../utils/utils.js");
const smite = require("../autoresponses/smite.js");

module.exports = async message => {
    const { author, channel, client, content, guild, mentions } = message;
    const { news, chat } = client.config.channels;

    if (author.id === client.user.id) return;

    if (channel.id === news) {
        const everyone = mentions.everyone;
        const channel = await guild.channels.fetch(chat);
        await utils.clone(message, channel, everyone);
        if (!everyone) message.delete().catch(console.log);
    }

    if (content.toLowerCase().includes("smarty smite") || content.toLowerCase().includes("smarty, smite")) {
        smite(message);
    }


    return;
}