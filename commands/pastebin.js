const paste = require('better-pastebin');

paste.setDevKey("devKey"); // https://pastebin.com/api

const init = function(message, command, args, channel) {
	if (!message.member.hasPermissions('SEND_MESSAGES')) {
		return channel.send({
			embed: {
				color: 0xff0000,
				title: '**Access denied**',
				description: 'You do not have enough power to use this command'
			}
		});
	}
    
	let targets = args.join(" ");
	targets = targets.split(">>");
	
	let text = targets[0];
	let title = targets[1];
	let format = targets[2];
	
	if (!title) title = 'Untitle';
	if (!format) format = 'text';
	if (!text) return channel.send('Uso: $newpaste [**contenido del paste**] >>[**titulo**] >>[**format**] - El titulo y el formato son opcionales. Ejemplo de uso: $newpaste var myApp = {}; >>My JS code >>javascript');
	
	paste.create({
		contents: text,
		name: title,
		privacy: '0',
		format: format
	}, (success, data) => {
		if (success) {
			channel.send(data);
		} else {
			console.log(data);
		}
	});
};

module.exports = {
    init,
    help: {
        name: 'Pastebin',
        cmds: ['paste', 'pastebin', 'newpaste']
    }
};