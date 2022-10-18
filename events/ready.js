const utils = require("../utils/utils.js");

module.exports = async (client) => {
    const fs = require("fs");

    fs.writeFileSync(`${utils.path.temp}/impersonate.json`, "{}");

    const commands = [];
    const global = [];
    const commandFiles = fs.readdirSync(utils.path.commands);

    for (const file of commandFiles) {
        const command = require(`${utils.path.commands}/${file}`);
        client.commands.set(command.data.name, command);
        if (command.global) global.push(command.data);
        else commands.push(command.data);

    }

    client.guilds.cache.each(guild => guild.commands.set(commands).catch(err => { console.log(err) }));
    client.application.commands.set(global);
}