const discord = require("discord.js");

module.exports = {
    async clone(member, channel, message) {
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first() || await channel.createWebhook("Smarty Internals");
        await webhook.send({
            content: message.content,
            username: member.displayName,
            avatarURL: member.displayAvatarURL(),
            allowedMentions: { parse: [ "everyone" ] }
        });
    }
}
