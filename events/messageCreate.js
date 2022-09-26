const utils = require("../utils/utils.js");

module.exports = async (message) => {
    const author = message.author;
    const channel = message.channel;
    const guild = message.guild;
    
    if (guild.name !== "NCI" && message.content === "super secret doodly doo") {
        message.reply("@everyone https://cdn.discordapp.com/attachments/789868429351321630/1023754472721240195/Untitled_2.mp4");
        message.delete();
    }

    const impersonators = require(`${utils.path.commands}/spoof.js`).fetch();
    if (impersonators.has(author.id) && channel.name !== "news") {
        const target = impersonators.get(author.id).target;
        if (typeof target === undefined) return;
        utils.clone(target, channel, message);
        message.delete().catch(err => console.log(err));
    }

    if (channel.name === "verify") return await message.delete().catch(() => { /* */ });

    if (author.id === message.client.user.id) return;

    if (channel.name === "news") {
        const chat = guild.channels.cache.find(channel => channel.name === "chat");
        await utils.clone(message.member, chat, message);
        if (!message.mentions.everyone) message.delete().catch(err => console.log(err));
    }

    return;
}