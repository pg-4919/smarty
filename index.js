const discord = require("discord.js");
const utils = require("./utils/utils.js");
const events = require("./events/events.js")
const fs = require("fs");

const client = new discord.Client({
    intents: [
        discord.GatewayIntentBits.DirectMessages,
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildBans,
        discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.MessageContent,
        discord.GatewayIntentBits.GuildMessageReactions
    ],
    partials: [,
        discord.Partials.Message,
        discord.Partials.Channel,
        discord.Partials.Reaction
    ],
});

client.commands = new discord.Collection(); //command files
client.impersonators = {};

client.on("guildMemberRemove", events.guildMemberRemove);
client.on("interactionCreate", events.interactionCreate);
client.on("messageCreate", events.messageCreate);
client.on("messageReactionAdd", events.messageReactionAdd);
client.on("ready", events.ready);

client.login("ODA5MTExMzAyMTk4MDAxNzI0.GCnFWc.gxTZz7zuO7AEchEpArmrdDSqQ4_htFBPKRPgws");