"use strict";

const fs = require("fs");
const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = async client => {
    client.commands = new discord.Collection();
    
    const commands = [];
    const global = [];
    const files = fs.readdirSync(utils.path.commands);

    for (const file of files) {
        const command = require(`${utils.path.commands}/${file}`);
        client.commands.set(command.data.name, command);
        if (command.global) global.push(command.data);
        else commands.push(command.data);
    }

    await client.guilds.cache.each(async guild => {
        await guild.commands.set(commands);
        await guild.members.fetch();
        await guild.roles.fetch();
        await guild.channels.fetch();
    });

    client.application.commands.set(global);

    client.config = require("../.config");

    client.user.setActivity("with fire", { type: 0 });

    return;
}