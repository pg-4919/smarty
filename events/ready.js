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


    async function getAll(channel, limit = 500) {
        const sum_messages = [];
        let last_id;
    
        while (true) {
            const options = { limit: 100 };
            if (last_id) {
                options.before = last_id;
            }
    
            const messages = await channel.fetchMessages(options);
            sum_messages.push(...messages.array());
            last_id = messages.last().id;
    
            if (messages.size != 100 || sum_messages >= limit) break;
        }
    
        return sum_messages;
    }

    console.log(getAll(guild.channels.cache.find(channel => channel.name === "news")).length);
}