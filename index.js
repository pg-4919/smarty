const discord = require("discord.js");
const config = require("./assets/config.json");
const utils = require("./utils/utils.js");
const events = require("./events/events.js")
const fs = require("fs");

const client = new discord.Client({ intents: [new discord.Intents(32767)] });

client.commands = new discord.Collection(); //command files

client.on("ready", async () => {
    const fs = require("fs");

    const commands = [];
    const commandFiles = fs.readdirSync(`${__dirname}/commands`);

    for (const file of commandFiles) {
        const command = require(`${__dirname}/commands/${file}`);
        client.commands.set(command.data.name, command);
        commands.push(command.data);
    }

    client.application.commands.set([]);
    client.guilds.cache.each(guild => guild.commands.set(commands).catch(err => { console.log(err) }));

    setInterval(utils.data.updateRepo, 60000);

    console.log(`Commands updated and bot logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", events.interactionCreate);

client.on("messageCreate", events.messageCreate);

client.on("channelPinsUpdate", async (channel, time) => {
    const pins = await channel.messages.fetchPinned();
    pins.each(async pin => {
        const featured = require(`${utils.path.data}/featured.json`);
        const channelMap = require(`${utils.path.assets}/channelmaps.json`);
        if (featured.includes(pin.id)) return;
        featured.push(pin.id);
        fs.writeFileSync(`${utils.path.data}/featured.json`, JSON.stringify(featured));
        await utils.clone(pin.member, channel.guild.channels.cache.get(channelMap[channel.guild.id].featured), pin);
        await pin.unpin();
    });
    await utils.data.updateRepo();
});

client.login("ODA5MTExMzAyMTk4MDAxNzI0.GCnFWc.gxTZz7zuO7AEchEpArmrdDSqQ4_htFBPKRPgws");

process.on("SIGINT", async () => {
    await utils.data.updateRepo();
    console.log("Finished saving to repository")
    process.exit();
});