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

module.exports = async (message) => {
    const { channel, reference } = message;

    if (reference) {
        const reply = await channel.messages.fetch(reference.messageId);

        const target = reply.author;
        if (!target) return;

        const filename = `${utils.path.assets}/smite/smite_${target.id}.gif`;

        if (!fs.existsSync(filename)) {
            const gif = await smite(target);
            fs.writeFileSync(filename, gif);
        }

        channel.send({ files: [filename] });
    }
}