const paste = require('better-pastebin');

paste.setDevKey("devKey"); // https://pastebin.com/api

let commands = {
	pastebin: function(message, user, command, args) {
		let targets = args.join(' ');
		targets = targets.split('>>');
	
		let text = targets[0];
		let title = targets[1];
		let format = targets[2];
	
		if (!title) title = 'Untitle';
		if (!format) format = 'text';
		if (!text) return message.reply('Use: $newpaste [**text**] >>[**title**] >>[**format**] - The title and format are optional. Ex: $newpaste var myApp = {}; >>My JS code >>javascript');
	
		paste.create({
			contents: text,
			name: title,
			privacy: '0',
			format: format
		}, (success, data) => {
			if (success) {
				return message.channel.send(data);
			} else {
				console.log(data);
			}
		});
	}
};
commands['newpaste'] = commands.pastebin;
commands['paste'] = commands.pastebin;


exports.commands = commands;