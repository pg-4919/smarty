const discord = require("discord.js");
const utils = require("./utils.js");

module.exports = async (destination, message, link = false) => {
    const {
        attachments,
        author,
        channel,
        client,
        content,
        embeds,
        member,
        reference,
        type,
        url
    } = message;

    const webhooks = await destination.fetchWebhooks();
    const webhook = webhooks.first() || await destination.createWebhook({ name: "Smarty" });
    const { curved, straight } = client.config.emojis;

    let reply = "";
    if (reference && type === 19) {
        const { author, content } = await channel.messages.fetch(reference.messageId);
        const truncated = utils.truncate(content, 50);
        const mention = `<@${(author.id ? author.id : "1".repeat(19))}>`;
        reply = `<:curved:${curved}> ${mention}${truncated}\n<:straight:${straight}>\n `;
    }

    await webhook.send({
        allowedMentions: { parse: [] },
        avatarURL: member?.displayAvatarURL() || null,
        content: reply + content + (link ? `\n[\[jump\]](${url})` : "") || "",
        embeds: [...embeds],
        files: [...(attachments?.values() || [null])],
        username: member?.displayName || author?.username || "Anonymous"
    }).catch(err => console.log);

    return;
}