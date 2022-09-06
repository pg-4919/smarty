const root = require("./root.js")

module.exports = {
    async purge(guild) {
        const roles = guild.roles.cache;
        roles.each(async role => { 
            if (role.members.size === 0) await role.delete().catch(() => {})
        });
        return;
    }
}