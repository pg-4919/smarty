"use strict";

const discord = require("discord.js");
const truncate = require("./truncate.js");

module.exports = async (destination, message, link = false) => {
    // deconstruct message into object
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

    // find a webhook or create one if necessary
    const webhooks = await destination.fetchWebhooks();
    const webhook = webhooks.first() || await destination.createWebhook({ name: "Smarty" });

    const { curved, straight } = client.config.emojis; // get the reply shaped emojis

    // if the message is a reply to another one, store the replied-to message in a variable
    let reply = "";
    if (reference && type === 19) {
        const { author, content } = await channel.messages.fetch(reference.messageId);
        const truncated = truncate(content, 50);
        const mention = `<@${(author.id ? author.id : "1".repeat(19))}>`;
        reply = `<:curved:${curved}> ${mention}${truncated}\n<:straight:${straight}>\n `;
    }

    return await webhook.send({
        allowedMentions: { parse: [] }, // make sure @everyone/@here is silenced
        avatarURL: member?.displayAvatarURL() || null,
        content: `${reply}${content}` || "", // add [jump] link
        embeds: [...embeds], // copy embeds
        files: [...(attachments?.values() || [null])], // copy files
        username: member?.displayName || author?.username || "Anonymous", // redundant username checks
        flags: [4096], // set the message to silent
        components: [
            discord.ActionRowBuilder().addComponents(
                new discord.ButtonBuilder()
                    .setLabel("Jump")
                    .setStyle(discord.ButtonStyle.Link)
                    .setURL(url)
            )
        ]
    }).catch(err => console.log);

    new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel('CLICK THIS')
                .setURL("urlhere")
                .setStyle('LINK'),
        );

        
}