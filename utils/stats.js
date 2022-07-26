const fs = require("fs");
const root = require("./root.js");

module.exports = {
    read(server, user, statName) {
        const currentStats = JSON.parse(fs.readFileSync(`${root}/data/stats.json`));
        currentStats[server.id] = currentStats[server.id] || {};
        currentStats[server.id][user.id] = currentStats[server.id][user.id] || {};
        currentStats[server.id][user.id][statName] = currentStats[server.id][user.id][statName] || 0;
        return currentStats[server.id][user.id][statName];
        fs.writeFileSync("./data/stats.json", JSON.stringify(currentStats, null, 4));
    },
    write(server, user, statName, value) {
        const currentStats = JSON.parse(fs.readFileSync(`${root}/data/stats.json`));
        currentStats[server.id] = currentStats[server.id] || {};
        currentStats[server.id][user.id] = currentStats[server.id][user.id] || {};
        currentStats[server.id][user.id][statName] = currentStats[server.id][user.id][statName] || 0;
        currentStats[server.id][user.id][statName] = value;
        fs.writeFileSync("./data/stats.json", JSON.stringify(currentStats, null, 4));
    },
    increment(server, user, statName, value) {
        const currentStats = JSON.parse(fs.readFileSync(`${root}/data/stats.json`));
        currentStats[server.id] = currentStats[server.id] || {};
        currentStats[server.id][user.id] = currentStats[server.id][user.id] || {};
        currentStats[server.id][user.id][statName] = currentStats[server.id][user.id][statName] || 0;
        currentStats[server.id][user.id][statName] += value;
        fs.writeFileSync("./data/stats.json", JSON.stringify(currentStats, null, 4));
    },
    decrement(server, user, statName, value) {
        const currentStats = JSON.parse(fs.readFileSync(`${root}/data/stats.json`));
        currentStats[server.id] = currentStats[server.id] || {};
        currentStats[server.id][user.id] = currentStats[server.id][user.id] || {};
        currentStats[server.id][user.id][statName] = currentStats[server.id][user.id][statName] || 0;
        currentStats[server.id][user.id][statName] -= value;
        fs.writeFileSync("./data/stats.json", JSON.stringify(currentStats, null, 4));
    },
}