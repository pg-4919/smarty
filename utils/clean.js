"use strict";

const discord = require("discord.js");

module.exports = content => discord.cleanContent(discord.escapeMarkdown(content));

//content.replace(/([*])|(\|{2,})|(_{2,})|(^(> ))/g, "").replace(/\n/g, "");