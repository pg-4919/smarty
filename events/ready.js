"use strict";

const fs = require("fs");
const utils = require("../utils/utils.js");

client.commands = new discord.Collection(); //command files

module.exports = async client => {
    const commands = [];
    const global = [];
    const files = fs.readdirSync(utils.path.commands);

    for (const file of file) {
        const command = require(`${utils.path.commands}/${file}`);
        client.commands.set(command.data.name, command);
        if (command.global) global.push(command.data);
        else commands.push(command.data);
    }

    client.guilds.cache.each(guild => guild.commands.set(commands));
    client.application.commands.set(global);

    return;
}