"use strict";

const discord = require("discord.js");
const truncate = require("./truncate.js");

async function buildReply(reference, type) {
    const { curved, straight } = client.config.emojis;

    if (reference && type === 19) {
        const { author, content : rawContent } = await channel.messages.fetch(reference.messageId);
        const content = clean(truncate(rawContent, 50));
        const mention = `<@${(author.id ? author.id : "1".repeat(19))}>`;
        const reply = `<:curved:${curved}>  ${mention}${truncated}\n<:straight:${straight}>\n `;
        return reply;
    } else return undefined;
}

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
    
    return await webhook.send({
        allowedMentions: { parse: [] },
        avatarURL: member?.displayAvatarURL() || null,
        content: `${await buildReply(reference, type) || ""}${content}` || "",
        embeds: [...embeds],
        files: [...(attachments?.values() || [null])],
        username: member?.displayName || author?.username || "Anonymous",
        flags: [4096],
        components: link ? [new discord.ActionRowBuilder().addComponents(
            new discord.ButtonBuilder()
                .setLabel("Original message")
                .setStyle(discord.ButtonStyle.Link)
                .setURL(url)
        )
        ] : []
    }).catch(err => console.log);

}