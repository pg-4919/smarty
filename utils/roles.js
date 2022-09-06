const root = require("./root.js")

module.exports = {
    async purge(guild) {
        const roles = guild.roles.cache;
        await guild.members.fetch();
        roles.each(async role => { 
            console.log(role.members.size)
        });
        return;
    }
}