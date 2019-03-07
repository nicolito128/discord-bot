const fs = require('fs');
const config = require("./config.json");

function loadCommands(message) {
	let channel = message.channel,
		args = message.content.slice(config.prefix.length).trim().split(/ +/g),
		command = args.shift().toLowerCase(),
		status = false,
		permission;
		
	const files = fs.readdirSync('./commands');
	for (let file of files) {
		if (!file.includes('.js')) continue;
		
		let req = require(`./commands/${file}`);
		if (!req.help.cmds) return new Error('The list of "cmds" needed to execute the command was not found');
		if (!req.init) return new Error('The function "init" needed to execute the command was not found');
		if (!req.help.permission) {
			permission = 'SEND_MESSAGES';
		} else permission = req.help.permission;
		if (typeof permission !== 'string') return new Error('Permission expected a string value!');
		
		let cmds = req.help.cmds;
		
		for (let cmd of cmds) {
			if (command === cmd) {
				if (permission) {
					permission = permission.trim();
					if (!message.member.hasPermission(permission)) {
						message.channel.send({
							embed: {
								color: 0xff0000,
								title: '**Access denied**',
								description: 'You do not have enough power to use this command. Require permission: ' + permission
							}
						});
					}
					break;
				}
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