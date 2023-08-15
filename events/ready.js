"use strict";

const discord = require("discord.js");
const utils = require("../utils/utils.js");
const fs = require("fs");

async function updateCommands() {
    const commands = [];
    const files = fs.readdirSync(utils.path.commands);

    files.forEach(file => {
        const command = require(`${utils.path.commands}/${file}`);
        client.commands.set(command.data.name, command)
        commands.push(command.data);
    });

    const guild = await client.guilds.fetch(client.config.guild);
    await guild.commands.set(commands);
}

async function updateCaches() {
    await guild.members.fetch();
    await guild.roles.fetch();
    await guild.channels.fetch();
    await guild.invites.fetch();
    await guild.emojis.fetch();
}

module.exports = async client => {
    client.commands = new discord.Collection();
    client.clones = new discord.Collection();

    await updateCommands();
    await updateCaches();

    guild.roles.cache
        .filter(role => role.members.size === 0)
        .each(role => role.delete().catch(() => { }));

    await client.user.setActivity("with fire", { type: 0 });

    return console.log("Ready to domestically terrorize multiple nation states");
}