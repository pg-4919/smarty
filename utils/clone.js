"use strict";

const discord = require("discord.js");
const fs = require("fs");

const reply = require("./reply.js");
const path = require("./path.js");

async function fetchWebhook(destination) {
    const webhooks = await destination.fetchWebhooks();
    const webhook = webhooks.first() || await destination.createWebhook({ name: "Smarty" });
    return webhook;
}

module.exports = async (message, destination, link = false) => {
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
    console.log(client.clones);

    const webhook = await fetchWebhook(destination);

    const button = [new discord.ActionRowBuilder().addComponents(
        new discord.ButtonBuilder()
            .setLabel("Original message")
            .setStyle(discord.ButtonStyle.Link)
            .setURL(url))]

    const cloned = await webhook.send({
        allowedMentions: { parse: [] },
        embeds: [...embeds],
        files: [...(attachments?.values() || [null])],
        flags: [4096],

        avatarURL: member?.displayAvatarURL() || null,
        content: `${await reply(message, client.config.emojis) || ""}${content}` || "",
        username: member?.displayName || author?.username || "Anonymous",

        components: link ? button : []
    }).catch(err => console.log);

    // if the clone contains a link, add it to the list of clones
    if (link) {
        client.clones.set(message.id, cloned);
        client.clones.sort(message => message.createdTimestamp);
        if (client.clones.size > 100) client.clones.delete(client.clones.keyAt(0));
    }

    return;
}