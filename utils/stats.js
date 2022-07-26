const fs = require("fs");
const root = require("./root.js");

module.exports = {
    read(user, statName) {
        const currentStats = JSON.parse(fs.readFileSync(`${root}/data/stats.json`));
        currentStats[user.id] = currentStats[user.id] || {};
        currentStats[user.id][statName] = currentStats[user.id][statName] || 0;
        return currentStats[user.id][statName];
        fs.writeFileSync("./data/stats.json", JSON.stringify(currentStats, null, 4));
    },
    write(user, statName, value) {
        const currentStats = JSON.parse(fs.readFileSync(`${root}/data/stats.json`));
        currentStats[user.id] = currentStats[user.id] || {};
        currentStats[user.id][statName] = currentStats[user.id][statName] || 0;
        currentStats[user.id][statName] = value;
        fs.writeFileSync("./data/stats.json", JSON.stringify(currentStats, null, 4));
    },
    increment(user, statName, value) {
        const currentStats = JSON.parse(fs.readFileSync(`${root}/data/stats.json`));
        currentStats[user.id] = currentStats[user.id] || {};
        currentStats[user.id][statName] = currentStats[user.id][statName] || 0;
        currentStats[user.id][statName] += value;
        fs.writeFileSync("./data/stats.json", JSON.stringify(currentStats, null, 4));
    },
    decrement(user, statName, value) {
        const currentStats = JSON.parse(fs.readFileSync(`${root}/data/stats.json`));
        currentStats[user.id] = currentStats[user.id] || {};
        currentStats[user.id][statName] = currentStats[user.id][statName] || 0;
        currentStats[user.id][statName] -= value;
        fs.writeFileSync("./data/stats.json", JSON.stringify(currentStats, null, 4));
    },
}