const discord = require("discord.js");
const express = require("express");
const fs = require("fs");

const client = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES" ]});

client.on("ready", () => {
  const { REST } = require("@discordjs/rest");
  const { Routes } = require("discord-api-types/v9");
  
  const commands = [];
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
  for (const file of commandFiles) commands.push(require(`./commands/${file}`).data.toJSON());
  
  const rest = new REST({ version: "9" }).setToken(process.env.token)
  client.guilds.cache.forEach(guild => rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guild.id), { body: commands }));
});

client.login(process.env.TOKEN);

const app = express();
app.all("*", (req, res) => res.sendStatus(200));
app.listen(8080);
