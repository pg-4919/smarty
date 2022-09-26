const utils = require("../utils/utils.js");

module.exports = async (client) => {
    const fs = require("fs");

    fs.writeFileSync(`${utils.path.temp}/impersonate.json`, "{}");

    const commands = [];
    const commandFiles = fs.readdirSync(utils.path.commands);

    for (const file of commandFiles) {
        const command = require(`${utils.path.commands}/${file}`);
        client.commands.set(command.data.name, command);
        commands.push(command.data);
    }

    console.log(client.guilds.cache);
    const nci = client.guilds.cache.find(channel => channel.name === "NCI");
    const chat = nci.channels.cache.find(channel => channel.name === "chat");

    await nci.members.fetch();

    let lastmessage = (await chat.messages.fetch({ limit: 1 })).id;
    for (let i = 0; i < 10; i++) {
        const messages = (await chat.messages.fetch({ limit: 100, before: lastmessage })).reverse();
        messages.each(message => {
            let n = message.fetch();
            let member = n.member;
            console.log(`${member?.displayName}: ${n.content}`)
        });
        lastmessage = messages.first().id;
    }

    client.application.commands.set([]);
    client.guilds.cache.each(guild => guild.commands.set(commands).catch(err => { console.log(err) }));
    client.guilds.cache.each(utils.roles.purge);
}