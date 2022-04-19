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
    try {
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
                message.delete();
                setTimeout(() => admonishment.delete(), 5 * 1000);
            } else {
                const chat = message.guild.channels.cache.find(channel => channel.name === "chat");
                console.log(chat);
                const webhooks = await chat.fetchWebhooks()

                cloneHook = webhooks.find(webhook => webhook.name === "Smarty (DO NOT DELETE)");

                if (typeof cloneHook === undefined) chat.createWebhook("Smarty (DO NOT DELETE)");

                cloneHook.send({
                    content: message.content,
                    username: message.member.nickname || message.author.username,
                    avatarURL: message.author.avatarURL(),
                    allowedMentions: {
                        parse: [ "users", "roles" ]
                    }
                });
            }
        }
    } catch (error) {
        console.error(error);
    }
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
