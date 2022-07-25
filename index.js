const discord = require("discord.js");
const config = require("./assets/config.json");

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
    client.guilds.cache.each(guild => guild.commands.set(commands));

    console.log(`Commands updated and bot logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async interaction => {
    if (interaction.isCommand()) client.commands.get(interaction.commandName).execute(interaction);
});

client.on("messageCreate", async message => {
    if (message.author.id === client.user.id) return;

    if (message.channel.name === "news") {
        try {
            const chat = message.guild.channels.cache.find(channel => channel.name === "chat");
            await require("./utils/clone.js").clone(message.member, chat, message);
            if (!message.mentions.everyone) await message.delete();
        } catch (err) {
            console.log(err);
        }
    }
});

client.on("channelPinsUpdate", async (channel, time) => {
    const pinnedMessages = await channel.messages.fetchPinned();
    const latestPin = pinnedMessages.first();
    if (!latestPin.pinned) return;
    console.log(latestPin);
});

client.login("ODA5MTExMzAyMTk4MDAxNzI0.GCnFWc.gxTZz7zuO7AEchEpArmrdDSqQ4_htFBPKRPgws");
