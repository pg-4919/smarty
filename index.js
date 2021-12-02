const discord = require("discord.js");
const express = require("express");
const fs = require("fs");

const client = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES" ]});
client.on("ready", () => console.log("Logged in!"));
client.login(process.env.TOKEN);

const app = express();
app.all("*", (req, res) => res.sendStatus(200));
app.listen(8080);
