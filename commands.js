const fs = require('fs');
const config = require("./config.json");

function loadFiles() {
    const files = fs.readdirSync('./commands');
    for (let file of files) {
        if (!file.includes('.js')) {
            let index = files.indexOf(file);
            files.splice(index, 1);
        }
    }
    return files;
}

function checkPermissions(permission, message) {
    if (!permission || permission === undefined) {
        permission = 'SEND_MESSAGES';
    } else {
        permission = permission.trim();
    }
    
    if(!message.member.hasPermission(permission)) {
        return false;
    }
    
    return true;
}

function run(message) {
	const files = loadFiles();
	
	let s = false,
		channel = message.channel,
		args = message.content.slice(config.prefix.length).trim().split(/ +/g),
		command = args.shift().toLowerCase();
	
	for (let f in files) {
		const request = require(`./commands/${files[f]}`);
		
		if (!request.init) return new Error('The function "init" needed to execute the command was not found');
		if (!request.help.cmds) return new Error('The list of "cmds" needed to execute the command was not found');
		
		const cmds = request.help.cmds;
		
		const permission = request.help.permission;
		const permissionValue = checkPermissions(permission, message);
		const embed = {
		    embed: {
		        color: 0xff0000,
		        title: '**Access denied**',
		        description: `You do not have enough power to use this command. Require permission: ${permission}`
		}};
		
		for (let c in cmds) {
			if (command === cmds[c]) {
				if (!permissionValue) {
					channel.send(embed);
					break;
				}
				
				request.init(message, command, args, channel);
				s = true;
				break;
			}
			if (s) break;
		}
	}
}

exports.run = run;