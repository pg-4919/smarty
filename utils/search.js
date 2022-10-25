module.exports = (collection, term, property = "name") => {
    return collection.find(item => {
        console.log(item["name"], term);
        return item["name"] === term;
    }) || null;
}