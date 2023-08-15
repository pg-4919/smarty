"use strict";

const { Util } = require("discord.js");

module.exports = content => Util.escapeMarkdown(content);

//content.replace(/([*])|(\|{2,})|(_{2,})|(^(> ))/g, "").replace(/\n/g, "");