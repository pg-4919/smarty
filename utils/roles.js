const root = require("./root.js")

module.exports = {
    async purge(guild) {
        const roles = guild.roles.cache;
        roles.each(async role => { 
            console.log(role.size)
        });
        return;
    }
}