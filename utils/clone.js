module.exports = async (member, channel, message) => {
    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.first() || await channel.createWebhook("Smarty Internals");
    const attachments = message.attachments.toJSON();
    
    await webhook.send({
        files: [...message.attachments.values()],
        content: message.content || "⠀",
        username: member.displayName,
        avatarURL: member.displayAvatarURL(),
        allowedMentions: { parse: [] }
    });
}