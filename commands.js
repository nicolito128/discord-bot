const fs = require('fs');

function loadCommands(message) {
    const channel = message.channel;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const files = fs.readdirSync('./commands');
    for (let file of files) {
        if (!file.includes('.js')) continue;
        let req = require(`./commands/${file}`);
        
        if (!req.help.cmds) return new Error('The list of "cmds" needed to execute the command was not found');
        
        let cmds = req.help.cmds;
        for (let cmd of cmds) {
            if (cmd === command) {
                req.init(message, command, args, channel);
                // console.log(req.help.name + ' loaded!');
                break;
            } else continue;
        }
    }
}

module.exports = {
    loadCommands
};