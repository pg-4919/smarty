"use strict";

const discord = require("discord.js");
const truncate = require("./truncate.js");
const clean = require("./clean.js");

async function buildReply(message, emojis) {
    const { curved, straight } = emojis;
    const { reference, type, channel } = message;

    if (!(reference && type === 19)) return undefined;

    const { author, content } = await channel.messages.fetch(reference.messageId);
    const cleanedContent = clean(truncate(content, 50));
    const mention = `<@${(author.id ? author.id : "1".repeat(19))}>`;
    const reply = `<:curved:${curved}>  ${mention}${cleanedContent}\n<:straight:${straight}>\n `;
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
        content: `${await buildReply(message, client.config.emojis) || ""}${content}` || "",
        username: member?.displayName || author?.username || "Anonymous",

        components: link ? button : []
    }).catch(err => console.log);

}