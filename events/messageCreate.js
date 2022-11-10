const utils = require("../utils/utils.js");

module.exports = async message => {
    const { author, channel, client, guild } = message;
    const { verify, news, chat } = client.config.channels;

    if (channel.id === verify) return await message.delete().catch(() => {});

    if (author.id === client.user.id) return;

    if (channel.id === news) {
        const everyone = message.mentions.everyone;
        const channel = await guild.channels.fetch(chat);
        await utils.clone(channel, message, everyone);
        if (!everyone) message.delete().catch(console.log);
    }

    return;
}