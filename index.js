const discord = require("discord.js");
const express = require("express");
const fs = require("fs");

const smarty = new discord.Client();
const cooldowns = new discord.Collection();

const app = express();
app.listen(8080);
