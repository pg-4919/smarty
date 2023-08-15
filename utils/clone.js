"use strict";

const discord = require("discord.js");
const truncate = require("./truncate.js");

async function buildReply(reference, type) {
    const { curved, straight } = client.config.emojis;

    if (!(reference && type === 19)) return undefined;

    const { author, content: rawContent } = await channel.messages.fetch(reference.messageId);
    const content = clean(truncate(rawContent, 50));
    const mention = `<@${(author.id ? author.id : "1".repeat(19))}>`;
    const reply = `<:curved:${curved}>  ${mention}${truncated}\n<:straight:${straight}>\n `;
    return reply;
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

    const button = [new discord.ActionRowBuilder().addComponents(
        new discord.ButtonBuilder()
            .setLabel("Original message")
            .setStyle(discord.ButtonStyle.Link)
            .setURL(url))]

    return await webhook.send({
        allowedMentions: { parse: [] },
        embeds: [...embeds],
        flags: [4096],

        avatarURL: member?.displayAvatarURL() || null,
        content: `${await buildReply(reference, type) || ""}${content}` || "",
        username: member?.displayName || author?.username || "Anonymous",

        components: link ? button : []
    }).catch(err => console.log);

}