"use strict";

const fs = require("fs");
const discord = require("discord.js");
const utils = require("../utils/utils.js");
require("dotenv").config();

module.exports = async client => {
    client.commands = new discord.Collection();

    const commands = [];
    const files = fs.readdirSync(utils.path.commands);

    for (const file of files) {
        const command = require(`${utils.path.commands}/${file}`);
        client.commands.set(command.data.name, command);
        commands.push(command.data);
    }

    const guild = await client.guilds.fetch(client.config.guild);
    await guild.commands.set(commands);
    await guild.members.fetch();
    await guild.roles.fetch();
    await guild.channels.fetch();
    await guild.invites.fetch();
    await guild.emojis.fetch();

    client.config = {
        starred: process.env.NCI_CHANNEL_STARRED,
        news: process.env.NCI_CHANNEL_NEWS,
        chat: process.env.NCI_CHANNEL_CHAT,
        verify: process.env.NCI_CHANNEL_VERIFY,
    }

    client.user.setActivity("with fire", { type: 0 });

    return;
}