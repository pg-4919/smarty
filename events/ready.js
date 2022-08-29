const utils = require("../utils/utils.js");

module.exports = async (message) => {
    const fs = require("fs");

    fs.writeFileSync(`${utils.path.temp}/impersonators.json`, "{}");

    const commands = [];
    const commandFiles = fs.readdirSync(`${__dirname}/commands`);

    for (const file of commandFiles) {
        const command = require(`${utils.path.commands}/${file}`);
        client.commands.set(command.data.name, command);
        commands.push(command.data);
    }

    client.application.commands.set([]);
    client.guilds.cache.each(guild => guild.commands.set(commands).catch(err => { console.log(err) }));

    console.log(`Commands updated and bot logged in as ${client.user.tag}.`);
}