const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const discord = require("discord.js");
const client = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new discord.Collection(); //command files
client.states = new discord.Collection(); //game states (playing/not playing)
client.handlers = new discord.Collection(); //global message collectors
client.players = new discord.Collection(); //game players
client.data = new discord.Collection(); //game data/variables

client.on("ready", async () => {
    await updateCommands();
    client.states.set("acronym", false);
    console.log(`Commands updated and bot logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async interaction => {
    if (interaction.channel.name === "news") {
        const admonishment = await interaction.reply({
            embeds: [
                new discord.MessageEmbed()
                    .setColor("ff0000")
                    .setDescription(`Smarty commands cannot be used in news!`)
                    .setTimestamp()
                    .setFooter({ text: "woops it looks like bad stuff" })
            ],
            ephemeral: true
        });
    }
    if (interaction.isCommand()) client.commands.get(interaction.commandName).execute(interaction);
});

client.on("messageCreate", async message => {
    if (message.author.id === client.user.id) return;

    if (message.channel.name === "news") {
        if (!message.mentions.everyone) {
            const admonishment = await message.reply({
                embeds: [
                    new discord.MessageEmbed()
                        .setColor("ff0000")
                        .setDescription(`News is for news; to make a news post, mention @everyone or @here.`)
                        .setTimestamp()
                        .setFooter({ text: "This message will self destruct in 5 seconds." })
                ]
            });
            await message.delete();
            setTimeout(() => admonishment.delete().catch(err => console.error(err)), 5 * 1000);
        } else {
            const chat = message.guild.channels.cache.find(channel => channel.name === "chat");
            const webhook = require("./utils/clone.js").clone(chat, message.member);
            await webhook.send(message);
            return await webhook.delete({ reason: "Ephemeral webhook deletion" });
        }
    }
});

client.on("channelPinsUpdate", async (channel, time) => {
    const pinnedMessages = await channel.messages.fetchPinned();
    const latestPin = pinnedMessages.find(message => message.createdAt === time);
    latestPin.reply("This is a test. Harry is a Homosexual.")
});

client.login(token);

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
