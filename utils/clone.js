const discord = require("discord.js");
const truncate = require("./truncate.js");

module.exports = async (member, channel, message, ref = false) => {
    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.first() || await channel.createWebhook({ name: "Smarty" });
    const attachments = message.attachments?.toJSON();

    let content = message.content;
    let reference = "";

    if (message.reference && message.type === 19) {
        const reply = await message.channel.messages.fetch(message.reference.messageId);
        const truncated = truncate(reply.content, 30);
        const original = await reply.guild.members.fetch(reply.author.id);
        reply.guild.members.fetch();
        console.log(original);

        reference = "<:curved:1034653422416302151> "
            + discord.bold(original.displayName)
            + "  " + truncated
            + "\n<:straight:1034653871613681714>\n ";
    }

    webhook.send({
        files: [...(message.attachments?.values() || [null])],
        content: reference + message.content + (ref ? `\n[\[jump\]](${message.url})` : "") || "",
        username: message.member.displayName,
        avatarURL: message.member.displayAvatarURL() || null,
        allowedMentions: { parse: [] },
        embeds: [...message.embeds]
    }).catch(err => console.log);

    return;
}