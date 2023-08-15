const discord = require("discord.js");
const events = require("./events/events.js");

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
        discord.Partials.Reaction,
        discord.Partials.User,
        discord.Partials.GuildMember
    ],
});

client.config = JSON.parse(fs.readFileSync(".config"));

client.on("interactionCreate", events.interactionCreate);
client.on("messageCreate", events.messageCreate);
client.on("messageReactionAdd", events.messageReactionAdd);
client.on("ready", events.ready);

client.login(client.config.token);