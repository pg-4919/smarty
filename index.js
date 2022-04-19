const token = "ODA5MTExMzAyMTk4MDAxNzI0.YCQVnw.ajR0sCVEVc8LVcMrjzMZ2GWJOvQ";
const clientId = "809111302198001724";
const guildId = "803315311663251537";

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
                            .setDescription(`News is for news; to make a news post, mention @everyone or @here.
                            
        *This message will self destruct in 5 seconds.*`)
                            .setTimestamp()
                            .setFooter({ text: "did a small brain", iconURL: message.author.avatarURL() })
                    ]
                });
                message.delete();
                setTimeout(() => admonishment.delete(), 5 * 1000);
            } else {
                const chat = message.guild.channels.cache.find(channel => channel.name === "chat")
                const webhooks = await chat.fetchWebhooks()

                cloneHook = webhooks.find(webhook => webhook.name === "Smarty (DO NOT DELETE)");

                if (typeof cloneHook === undefined) chat.createWebhook("Smarty (DO NOT DELETE)");

                console.log(message.member.nickname || message.author.username);
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
        const command = require(`./commands/${file}`);
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
