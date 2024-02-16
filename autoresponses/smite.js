const discord = require("discord.js");
const utils = require("../utils/utils.js");
const canvas = require("canvas-gif");
const fs = require("fs");

async function smite(member) {
    const options = {
        coalesce: true,
        repeat: 1,
        algorithm: "neuquant",
        fps: 20,
        quality: 100,
    };

    const image = await utils.loadImage(member.displayAvatarURL({ extension: "jpg" }));
    const buffer = await canvas(`${utils.path.assets}/smite/smite_base.gif`, (context, a, b, c, currentFrame) => {
        if (currentFrame >= 20) return;
        context.drawImage(image, 267, 234, 50, 50);
    }, options)

    return buffer;
}

async function fetchWebhook(destination) {
    const webhooks = await destination.fetchWebhooks();
    const webhook = webhooks.find(webhook => webhook.name === "NCI Internals")
        || await destination.createWebhook({ name: "NCI Internals" });
    return webhook;
}

module.exports = async (message) => {
    const { client, channel, reference } = message;

    if (reference) {
        message.react("👍");

        const reply = await channel.messages.fetch(reference.messageId);

        const target = reply.author;
        if (!target) return;

        const filename = `${utils.path.assets}/smite/smite_${target.id}.gif`;

        if (!fs.existsSync(filename)) {
            const gif = await smite(target);
            fs.writeFileSync(filename, gif);
        }

        channel.send({ files: [filename] });

        //channel.send("https://media.discordapp.net/attachments/1014256055330549842/1206631983266926662/smite_784598998664085556.gif?ex=65dcb69a&is=65ca419a&hm=f4e39afe55449ad4d5e2e8ee4af5b790d6ab213a84346c558a0a68cf23afa28b&=")
    }
}