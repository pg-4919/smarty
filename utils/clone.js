const discord = require("discord.js")

module.exports = async (member, channel, message, ref = false) => {
    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.first() || await channel.createWebhook({ name: "Smarty" });
    const attachments = message.attachments.toJSON();
    
    try {
        await webhook.send({
            files: [...message.attachments.values()],
            content: message.content + (ref ? `\n[Jump](${message.url})` : "") || "",
            username: member.displayName || "Poopy Dookykins",
            avatarURL: member.displayAvatarURL() || null,
            allowedMentions: { parse: [] }
        });
    } catch (err) {
        console.log(err);
    }
}