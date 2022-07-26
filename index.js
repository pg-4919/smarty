const discord = require("discord.js");
const config = require("./assets/config.json");
const utils = require("./utils/utils.js");
const fs = require("fs");

const client = new discord.Client({ intents: [ new discord.Intents(32767) ] });

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
    client.guilds.cache.each(guild => guild.commands.set(commands).catch(() => {/**/}));

    setInterval(utils.data.updateRepo, 60000);

    console.log(`Commands updated and bot logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async interaction => {
    if (interaction.isCommand()) client.commands.get(interaction.commandName).execute(interaction);
});

client.on("messageCreate", async message => {
    const author = message.author;

    if (author.id === client.user.id) return;

    if (message.channel.name === "news") {
        const chat = message.guild.channels.cache.find(channel => channel.name === "chat");
        await require("./utils/clone.js").clone(message.member, chat, message);
        if (!message.mentions.everyone) message.delete().catch(() => {/**/});
    }

    const currentStats = JSON.parse(fs.readFileSync("./data/stats.json"));
    currentStats[author.id] = currentStats[author.id] || {};
    console.log(currentStats);
    //fs.writeFileSync("./data/stats.json", JSON.stringify(currentStats));
});

client.on("channelPinsUpdate", async (channel, time) => {
    const pinnedMessages = await channel.messages.fetchPinned();
    const latestPin = pinnedMessages.first();
    if (!latestPin.pinned) return;
    console.log(latestPin);
});

client.login("ODA5MTExMzAyMTk4MDAxNzI0.GCnFWc.gxTZz7zuO7AEchEpArmrdDSqQ4_htFBPKRPgws");

process.on("SIGINT", async () => {
    await utils.data.updateRepo();
    console.log("Finished saving to repository")
    process.exit();
});