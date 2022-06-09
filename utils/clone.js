const discord = require("discord.js");

module.exports = {
    async clone(member, channel, message) {
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first() || await channel.createWebhook("Smarty Internals");
        const attachments = message.attachments.toJSON();
        
        await webhook.send({
            attachments: attachments,
            content: message.content,
            username: member.displayName,
            avatarURL: member.displayAvatarURL(),
            allowedMentions: { parse: [ "everyone" ] }
        });
    }
}
