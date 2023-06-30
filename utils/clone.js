const discord = require("discord.js");
const truncate = require("./truncate.js");

async function _reply(message, client) {
    const { channel, reference, type } = message;
    const { curved, straight } = client.config.emojis;

    if (reference && type === 19) {
        const { author, content } = await channel.messages.fetch(reference.messageId);
        const truncated = truncate(content, 50);
        const mention = `<@${(author.id ? author.id : "1".repeat(19))}>`;

        return `<:curved:${curved}> `
            + mention
            + truncated
            + `\n<:straight:${straight}>\n `;
    } else return "";
}

module.exports = async (destination, message, link = false) => {
    const webhooks = await destination.fetchWebhooks();
    const webhook = webhooks.first() || await destination.createWebhook({ name: "Smarty" });

    const {
        attachments,
        author,
        channel,
        client,
        content,
        embeds,
        member,
        url
    } = message;

    const reply = await _reply(message, client);
    
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
