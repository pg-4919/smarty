const root = require("./root.js")

module.exports = {
    async purge(guild) {
        const roles = guild.roles.cache;
        await guild.members.fetch();
        return;
    }
}