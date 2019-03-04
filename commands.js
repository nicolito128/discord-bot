const fs = require('fs');

function loadCommands(message) {
    const channel = message.channel;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let files = fs.readdirSync('./commands');
    for (let file of files) {
        if (!file.includes('.js')) continue;
        let req = require(`./commands/${file}`);
        req.init(message, command, args, channel);
    }
}

module.exports = {
    loadCommands
};