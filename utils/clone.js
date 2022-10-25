const discord = require("discord.js")

module.exports = async (member, channel, message, ref = false) => {
    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.first() || await channel.createWebhook({ name: "Smarty" });
    const attachments = message.attachments?.toJSON();
    
    let content = message.content;
    let replyContent;
    if (message.reference && message.type === 19) {
        const reference = message.reference;
        const reply = await message.channel.messages.fetch(reference.messageId);
        replyContent = (reply.content.length > 30) ? reply.content.slice(0, 30) + '...' : reply.content;
        console.log(replyContent);
    }



    try {
        await webhook.send({
            files: [...(message.attachments?.values() || [null])],
            content: "" + discord.italic(replyContent) + "\n" + message.client.emojis.resolveIdentifier("1034553094354255953") + message.content + (ref ? `\n[\[jump\]](${message.url})` : "") || "",
            username: message.member.displayName,
            avatarURL: message.member.displayAvatarURL() || null,
            allowedMentions: { parse: [] }
        });
    } catch (err) {
        console.log(err);
    }
}