"use strict";

const discord = require("discord.js");

module.exports = content => discord.escapeMarkdown(content).replace(/\@everyone/g, "everyone");

//content.replace(/([*])|(\|{2,})|(_{2,})|(^(> ))/g, "").replace(/\n/g, "");