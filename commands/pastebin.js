const paste = require('better-pastebin');

paste.setDevKey("devKey"); // https://pastebin.com/api

const init = function(message, command, args, channel) {
	let targets = args.join(' ');
	targets = targets.split('>>');
	
	let text = targets[0];
	let title = targets[1];
	let format = targets[2];
	
	if (!title) title = 'Untitle';
	if (!format) format = 'text';
	if (!text) return channel.send('Use: $newpaste [**text**] >>[**title**] >>[**format**] - The title and format are optional. Ex: $newpaste var myApp = {}; >>My JS code >>javascript');
	
	paste.create({
		contents: text,
		name: title,
		privacy: '0',
		format: format
	}, (success, data) => {
		if (success) {
			return channel.send(data);
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