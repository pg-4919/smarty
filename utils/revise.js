"use strict";

const discord = require("discord.js");

module.exports = async (client, message) => {
    const { id } = message;
    const { chat } = client.config;

    console.log(await chat.fetch({ around: id }));
}