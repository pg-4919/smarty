"use strict";

const discord = require("discord.js");
const utils = require("../utils/utils.js");
const fs = require("fs");

module.exports = async client => {
    client.commands = new discord.Collection();
    client.logs = [];

    const commands = [];
    const files = fs.readdirSync(utils.path.commands);

    for (const file of files) {
        const command = require(`${utils.path.commands}/${file}`);
        client.commands.set(command.data.name, command)
        commands.push(command.data);
    }

    const guild = await client.guilds.fetch(client.config.guild);
    await guild.commands.set(commands);

    await guild.members.fetch();
    await guild.roles.fetch();
    await guild.channels.fetch();
    await guild.invites.fetch();
    await guild.emojis.fetch();

    guild.roles.cache
        .filter(role => role.members.size === 0)
        .each(role => role.delete().catch(() => { }));

    await client.user.setActivity("with fire", { type: 0 });

    async function fetchAllMessages() {
        const channel = client.channels.cache.get("1014256055330549842");
        let messages = [];

        let message = await channel.messages
            .fetch({ limit: 1 })
            .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));

        while (message) {
            await channel.messages
                .fetch({ limit: 100, before: message.id })
                .then(messagePage => {
                    const long = messagePage.filter(msg => msg.content?.length >= 500);
                    const peters = long.filter(msg => msg.author?.id === "789695310875197460");
                    peters.forEach(msg => messages.push(msg.content));
                    message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
                })
            console.log("ballers");
        }

        const peters = messages.filter(msg => msg.author?.id === "789695310875197460");
        const long = peters.filter(msg => msg.content?.length >= 500);

        return long;
    }

    (await fetchAllMessages()).forEach(msg => console.log(msg.content));

    return;
}