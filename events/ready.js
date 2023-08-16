"use strict";

const discord = require("discord.js");
const utils = require("../utils/utils.js");
const fs = require("fs");

async function updateCommands(client, guild) {
    const commands = [];
    const files = fs.readdirSync(utils.path.commands);

    files.forEach(file => {
        const command = require(`${utils.path.commands}/${file}`);
        client.commands.set(command.data.name, command)
        commands.push(command.data);
    });

    await guild.commands.set(commands);
}

async function updateCaches(guild) {
    await guild.members.fetch();
    await guild.roles.fetch();
    await guild.channels.fetch();
    await guild.invites.fetch();
    await guild.emojis.fetch();
}

async function pruneRoles(guild) {
    guild.roles.cache
        .filter(role => role.members.size === 0)
        .each(role => role.delete().catch(() => { }));
}

function fetchClones() {
    const clones = new discord.Collection();
    const serialized = JSON.parse(fs.readFileSync(`${path.root}/clones.json`));
    Object.entries(serialized).forEach(entry => clones.set(entry.key, entry.value));
    return clones;
}

module.exports = async client => {
    const guild = await client.guilds.fetch(client.config.guild);
    client.commands = new discord.Collection();
    client.clones = fetchClones();

    await updateCommands(client, guild);
    await updateCaches(guild);
    await pruneRoles(guild);

    await client.user.setActivity("with nuclear weapons", { type: 0 });
    return console.log("Ready to domestically terrorize multiple nation states");
}