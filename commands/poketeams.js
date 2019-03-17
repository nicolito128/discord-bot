const fs = require('fs');
const validTiers = ['ou', 'ubers', 'uu', 'pu', 'nu', 'lc'];

function writeTeams(teams) {
	if (!teams || teams === undefined || !typeof teams == 'object') {
		return new Error("Can't overwrite the file!");
	}
	return fs.writeFile(__dirname + '/../data/teams.json', teams);
}

const init = function(message, user, command, args) {
	let teams = {};
	teams = JSON.parse(fs.readFileSync(__dirname + '/../data/teams.json'));
	
	if (command === 'addteam') {
		let targets = args.join(' ');
		targets = targets.split(' ');
		
		if (!targets[0] || targets[0] === 'help') {
			return message.reply('Use: $addteam [**tier**] [**team**]');
		}
		
		let tier = targets[0];
		let team = targets[1];
		
		if (!tier) return message.reply('Specify a tier.');
		if (!team) return message.reply('Specify a team.');
		
		if (team.includes('pokepast.es')) {
			for (let t in validTiers) {
				if (tier.includes(validTiers[t])) {
					if (!teams[tier]) teams[tier] = [];
					teams[tier].push(team);
					teams = JSON.stringify(teams);
					writeTeams(teams);
					return message.channel.send('Team saved successfully.');
				} else return message.reply('Invalid tier.');
			}
		} else return message.reply('Use the https://pokepast.es/ page to save a team.');
	}
	
	for (let t in validTiers) {
		if (command === validTiers[t]) {
			let team = teams[command];
			if (!team || team === undefined) return message.channel.send('There are not teams in this tier.');
			let random = Math.round(Math.random() * (team.length - 1));
			return message.channel.send(`A random team ${command.toUpperCase()} for you: ${team[random]}`);
		}
	}
};

module.exports = {
    init,
    help: {
        name: 'Pokémon Teams',
        cmds: validTiers.concat('addteam')
    }
};