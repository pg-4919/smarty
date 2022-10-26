const discord = require("discord.js")

module.exports = async (member, channel, message, ref = false) => {
    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.first() || await channel.createWebhook({ name: "Smarty" });
    const attachments = message.attachments?.toJSON();
    
    let content = message.content;
    let reference = "";
    if (message.reference && message.type === 19) {
        const reply = await message.channel.messages.fetch(message.reference.messageId);
        const truncated = (reply.content.length > 30) ? reply.content.slice(0, 30) + '...' : reply.content;
        reference = discord.bold(message.member.displayName) + "  "
            + truncated
            + "<:curved:1034653422416302151>\n<:straight:1034653871613681714>\n";
    }

    try {
        await webhook.send({
            files: [...(message.attachments?.values() || [null])],
            content: reference + message.content + (ref ? `\n[\[jump\]](${message.url})` : "") || "",
            username: message.member.displayName,
            avatarURL: message.member.displayAvatarURL() || null,
            allowedMentions: { parse: [] },
            embeds: [ ...message.embeds ]
        });
    } catch (err) {
        console.log(err);
    }
}