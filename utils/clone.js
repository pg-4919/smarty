const discord = require("discord.js")

module.exports = async (member, channel, message, ref = false) => {
    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.first() || await channel.createWebhook({ name: "Smarty" });
    const attachments = message.attachments?.toJSON();
    
    let content = message.content;
    if (message.reference && message.type === 19) {
        const reference = message.reference;
        const reply = message.channel.messages.get(reference.messageId);
        console.log(reply);
    }

    try {
        await webhook.send({
            files: [...(message.attachments?.values() || [null])],
            content: message.content + (ref ? `\n[\[jump\]](${message.url})` : "") || "",
            username: message.member.displayName || "Poopy Dookykins",
            avatarURL: message.member.displayAvatarURL() || null,
            allowedMentions: { parse: [] }
        });
    } catch (err) {
        console.log(err);
    }
}