const utils = require("../utils/utils.js");

module.exports = async message => {
    const { author, channel, client, guild } = message;
    const { news, chat } = client.config.channels;

    if (author.id === client.user.id) return;

    if (channel.id === news) {
        const everyone = message.mentions.everyone;
        const channel = await guild.channels.fetch(chat);
        await utils.clone(message, channel, everyone);
        if (!everyone) message.delete().catch(console.log);
    }

    return;
}