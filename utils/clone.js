module.exports = async (member, channel, message) => {
    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.first() || await channel.createWebhook({ name: "Smarty" });
    const attachments = message.attachments.toJSON();
    
    await webhook.send({
        files: [...message.attachments.values()],
        content: message.content || "",
        username: member.displayName || "Poopy Dookykins",
        avatarURL: member.displayAvatarURL() || null,
        allowedMentions: { parse: [] }
    });
}