const utils = require("../utils/utils.js");

module.exports = async message => {
    const { author, channel, client, guild } = message;
    const { verify, news, chat } = client.config.channels;

    if (channel.id === verify) return message.delete().catch(console.log);

    if (author.id === client.user.id) return;

    if (channel.id === news) {
        const everyone = message.mentions.everyone;
        const channel = await guild.channels.fetch(chat);
        await utils.clone(channel, message, everyone);
        if (!everyone) message.delete().catch(console.log);
        utils.revise(message)
    }

    return;
}