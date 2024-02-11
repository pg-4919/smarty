const canvas = require("canvas");
const axios = require("axios");

module.exports = (url) => {
    return new Promise((resolve, reject) => {
        const img = new canvas.Image()

        img.onload = () => resolve(img)
        img.onerror = err => reject(new Error(err))

        axios.get(url, { responseType: 'arraybuffer' })
            .then(response => img.src = Buffer.from(response.data, "binary"))
            .catch(reject)
    })
}
