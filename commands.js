const fs = require('fs');

function loadCommands(message) {
    let channel = message.channel,
        args = message.content.slice(config.prefix.length).trim().split(/ +/g),
        command = args.shift().toLowerCase(),
        status = false;

    const files = fs.readdirSync('./commands');
    for (let file of files) {
        if (!file.includes('.js')) continue;
        let req = require(`./commands/${file}`);
        
        if (!req.help.cmds) return new Error('The list of "cmds" needed to execute the command was not found');
        if (!req.init) return new Error('The function "init" needed to execute the command was not found');
        let cmds = req.help.cmds;
        
        for (let cmd of cmds) {
            if (command === cmd) {
                req.init(message, command, args, channel);
                status = true;
                // console.log(req.help.name + ' loaded!');
                break;
            } else continue;
        }
        if (status === true) break;
    }
}

module.exports = {
    loadCommands
};