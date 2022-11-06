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
        const { commands, members, roles, channels } = guild;
        await commands.set(commands);
        await members.fetch();
        await roles.fetch();
        await channels.fetch();
    });

    client.application.commands.set(global);

    client.config = {
        starred: "1016113247662919760",
        news: "997661924546322472",
        chat: "1014256055330549842",
        verify: "1016116460025806848"
    }

    client.user.setActivity("with fire", { type: 0 });

    return;
}