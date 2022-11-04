const discord = require("discord.js")

module.exports = async (member, channel, message, ref = false) => {
    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.first() || await channel.createWebhook({ name: "Smarty" });
    const attachments = message.attachments?.toJSON();
    
    let content = message.content;
    let reference = "";

    if (message.reference && message.type === 19) {
        const reply = await message.channel.messages.fetch(message.reference.messageId);
        const truncated = utils.truncate(reply.content.length);
        const original = reply.member || reply.guild.members.fetch(reply.user.id);
        console.log(original);
        reference = "<:curved:1034653422416302151> "
            + discord.bold(await (message.guild.members.cache.find(reply.author.id))?.displayName || reply.author.username)
            + "  " + truncated
            + "\n<:straight:1034653871613681714>\n ";
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