"use strict";

const fs = require("fs");
const discord = require("discord.js");
const utils = require("../utils/utils.js");
require("dotenv").config();

module.exports = async client => {
    client.commands = new discord.Collection();
    client.config = await JSON.parse(fs.readFileSync(`${process.env.SMARTY_HOME}/.config`));
    
    const commands = [];
    const files = fs.readdirSync(utils.path.commands);

    for (const file of files) {
        const command = require(`${utils.path.commands}/${file}`);
        client.commands.set(command.data.name, command);
        commands.push(command.data);
    }

    const guild = await client.guilds.fetch(client.config.guild);
    guild.commands.set(commands);
    guild.members.fetch();
    guild.roles.fetch();
    guild.channels.fetch();

    console.log(process.env.SMARTY_HOME);
    
    client.user.setActivity("with fire", { type: 0 });

    return;
}