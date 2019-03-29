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

function setCommandParams(message) {
	if (!message.content.includes(config.prefix)) {
		return false;
	} else {
		let user = message.member.user,
			args = message.content.slice(config.prefix.length).trim().split(/ +/g),
			command = args.shift().toLowerCase();
		return [args, user, command];
	}
}

function checkCommand(curCommand, message, command, user, args) {
	if (!curCommand.init) return new Error('The function "init" needed to execute the command was not found');
	if (!curCommand.help) return new Error('The object "help" needed to execute the command was not found');
	
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
			if (!permissionValue || permissionValue == undefined) {
				return message.channel.send(embed);
			}
			return curCommand.init(message, user, command, args);
		}
	}
}

function run(message) {
	const files = loadFiles();
	const params = setCommandParams(message);
	let args, command, user;
	
	if(!params) {
		return false;
	} else {
		args = params[0];
		user = params[1];
		command = params[2];
	}
	
	for (let f in files) {
		const curCommand = require(`./commands/${files[f]}`);
		return checkCommand(curCommand, message, command, user, args);
	}
}

exports.run = run;