module.exports = {
    byName = (collection, value) => collection.find(item => item.name === value)
}