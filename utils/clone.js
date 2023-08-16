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

function saveClones(clones) {
    clones.sort(message => message.createdTimestamp);
    if (clones.size > 100) clones.delete(clones.keyAt(0));

    const serialized = {};
    clones.forEach((value, key) => serialized[key] = value);
    fs.writeFileSync(`${path.root}/clones.json`, JSON.stringify(serialized));
    return;
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
        saveClones(client.clones);
    }

    return;
}