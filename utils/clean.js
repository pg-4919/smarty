"use strict";

const discord = require("discord.js");

module.exports = content => discord.cleanContent(
    discord.escapeMarkdown(content)
        .replace(/\@everyone/g, "everyone")
        .replace(/\@here/g, "here")
        .replace(/https?:\/\//g, "")
);