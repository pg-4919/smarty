
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const discord = require("discord.js");
const client = new discord.Client({ intents: new discord.Intents(32767) });

client.commands = new discord.Collection(); //command files
client.states = new discord.Collection(); //game states (playing/not playing)
client.handlers = new discord.Collection(); //global message collectors
client.players = new discord.Collection(); //game players
client.data = new discord.Collection(); //game data/variables

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
    client.guilds.cache.get("803315311663251537").commands.set(commands);
    
    client.states.set("acronym", false);
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
            const webhook = await require("./utils/clone.js").clone(message.member, chat, message);
            if (!message.mentions.everyone) await message.delete();
        } catch (err) {
            console.log(err);
        }
    }
});

client.on("channelPinsUpdate", async (channel, time) => {
    const pinnedMessages = await channel.messages.fetchPinned();
    const latestPin = pinnedMessages.find(message => message.createdTimestamp == time);
});

client.login("ODA5MTExMzAyMTk4MDAxNzI0.GrwWKe.l5pMFjcnH4ieVn2IuJbftpRV4RFE7N-bg1ZOng");

async function updateCommands() {
    const fs = require("fs");

    const commands = [];
    const commandFiles = fs.readdirSync(`${__dirname}/commands`);

    for (const file of commandFiles) {
        const command = require(`${__dirname}/commands/${file}`);
        client.commands.set(command.data.name, command);
        commands.push(command.data);
    }

    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v9");

    const rest = new REST({ version: "9" }).setToken(token);

    try {
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );
    } catch (error) {
        console.error(error);
    }
}

