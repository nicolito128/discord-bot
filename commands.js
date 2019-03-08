const fs = require('fs');
const config = require('./config.json');

function loadFiles() {
    const files = fs.readdirSync('./commands');
    for (let file of files) {
    	// Filter all non-JS files from the command folder
        if (!file.includes('.js')) {
            let index = files.indexOf(file);
            files.splice(index, 1);
        }
    }
    return files;
}

// Check if the user can use this command
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
	
	let channel, args, command;
	
	// If the command does not include the prefix, nothing will happen
	if (!message.content.includes(config.prefix)) {
		return false;
	} else {
		channel = message.channel,
		args = message.content.slice(config.prefix.length).trim().split(/ +/g),
		command = args.shift().toLowerCase();
	}
	
	for (let f in files) {
		const curCommand = require(`./commands/${files[f]}`);
		
		if (!curCommand.init) return new Error('The function "init" needed to execute the command was not found');
		if (!curCommand.help.cmds) return new Error('The list of "cmds" needed to execute the command was not found');
		
		const cmds = curCommand.help.cmds,
		    permission = curCommand.help.permission,
			permissionValue = checkPermissions(permission, message),
			embed = {
				embed: {
					color: 0xff0000,
					title: 'Access denied',
					description: `You do not have enough power to use this command. Require permission: ${permission}`
				}
			};
		
		for (let c in cmds) {
			if (cmds && command === cmds[c]) {
				if (!permissionValue) {
					return channel.send(embed);
				}
				
				return curCommand.init(message, command, args, channel);
			}
		}
	}
}

exports.run = run;