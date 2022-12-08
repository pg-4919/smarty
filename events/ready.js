"use strict";

const discord = require("discord.js");
const utils = require("../utils/utils.js");
const fs = require("fs");

module.exports = async client => {
    client.commands = new discord.Collection();
    
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

    guild.roles.cache.filter(role => role.members.size === 0).each(role => role.delete());

    client.user.setActivity("with fire", { type: 0 });

    return;
}