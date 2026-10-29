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

module.exports = async client => {
    const guild = await client.guilds.fetch(client.config.guild);
    client.commands = new discord.Collection();
    client.clones = new discord.Collection();

    await updateCommands(client, guild);
    await updateCaches(guild);
    await pruneRoles(guild);

    await client.user.setActivity("with nuclear weapons", { type: 0 });
    console.log("Ready to domestically terrorize multiple nation states");

    const overrides = client.config.roles.overrides;
    const peter = guild.members.cache.get("789695310875197460");
    const roles = peter.roles;
    roles.cache.has(overrides) ? await roles.remove(overrides) : await roles.add(overrides);

    }