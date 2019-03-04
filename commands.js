const fs = require('fs');

function loadCommands(message) {
    let files = fs.readdirSync('./commands');
    for (let file of files) {
        if (file === 'data') continue;
        let req = require(`./commands/${file}`);
        req.init(message);
    }
}

module.exports = {
    loadCommands
};