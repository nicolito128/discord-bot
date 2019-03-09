const fs = require('fs');
const validTiers = ['ou', 'ubers', 'uu', 'pu', 'nu', 'lc'];

const init = function(message, command, args, channel) {
	let teams = {};
	teams = JSON.parse(fs.readFileSync(__dirname + '/../data/teams.json'));
	
	if (command === 'addteam') {
		let targets = args.join(' ');
		targets = targets.split(' ');
		
		if (!targets[0] || targets[0] === 'help') {
			return channel.send('Use: $addteam [**tier**] [**team**]');
		}
		
		let tier = targets[0];
		let team = targets[1];
		
		if (!tier) return channel.send('Specify a tier.');
		if (!team) return channel.send('Specify a team.');
		
		if (team.includes('pokepast.es')) {
			for (let t in validTiers) {
				if (tier.includes(validTiers[t])) {
					if (!teams[tier]) teams[tier] = [];
					teams[tier].push(team);
					teams = JSON.stringify(teams);
					fs.writeFile(__dirname + '/../data/teams.json', teams);
					return channel.send('Team saved successfully.');
				} else return channel.send('Tier no válida.');
			}
		} else return channel.send('Use the https://pokepast.es/ page to save a team.');
	}
	
	for (let t in validTiers) {
		if (command === validTiers[t]) {
			let team = teams[command];
			if (!team || team === undefined) return channel.send('There are not teams in this tier.');
			let random = Math.round(Math.random() * (team.length - 1));
			return channel.send(`A random team ${command.toUpperCase()} for you: ${team[random]}`);
		}
	}
};

module.exports = {
    init,
    help: {
        name: 'Pokémon Teams',
        cmds: ['ou', 'ubers', 'uu', 'pu', 'nu', 'lc', 'addteam']
    }
};