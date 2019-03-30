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

// Returns the arguments that the commands will use
function setParams(message) {
	if (!message.content.includes(config.prefix)) {
		return false;
	} else {
		let user = message.member.user,
			args = message.content.slice(config.prefix.length).trim().split(/ +/g),
			command = args.shift().toLowerCase();
		return [args, user, command];
	}
}

// Check that the command can be executed by the user.
function checkCommand(curCommand, message, command) {
	const permission = checkPermissions(curCommand.permission, message),
		embed = {
			embed: {
				color: 0xff0000,
				title: 'Access denied',
				description: `You do not have enough power to use this command. Require permission: ${curCommand.permission}`
			}
		};
	if (!permission) return message.channel.send(embed);
	
	curCommand = curCommand.commands[command];
	if (curCommand && curCommand != undefined) {
		return curCommand;
	} else {
		return false;
	}
}

function run(message) {
	const files = loadFiles();
	const params = setParams(message);
	let args, command, user;
	
	if(!params) {
		return false;
	} else {
		[args, user, command] = params;
	}
	
	for (let f in files) {
		const curCommand = require(`./commands/${files[f]}`);
		
		let verification = checkCommand(curCommand, message, command);
		if (verification) {
			return verification(message, user, command, args);
		}
	}
}

exports.run = run;