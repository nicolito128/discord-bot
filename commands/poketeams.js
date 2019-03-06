const fs = require('fs');
const validTiers = ['ou', 'ubers'];

const init = function(message, command, args, channel) {
	let teams = {};
	teams = JSON.parse(fs.readFileSync(__dirname + '/../data/teams.json'));
	
	if (command === 'addteam') {
		let targets = args.join(" ");
		targets = targets.split(" ");
		
		if (!targets[0] || targets[0] === 'help') {
			return channel.send('Uso: $addteam [**tier**] [**team**]');
		}
		
		let tier = targets[0].toLowerCase();
		let team = targets[1];
		
		if (!tier) return channel.send('Especifica una tier.');
		if (!team) return channel.send('Especifica un team.');
		
		for (let t in validTiers) {
			if (tier === validTiers[t]) {
				if (!teams[tier]) teams[tier] = [];
				
				teams[tier].push(team);
				teams = JSON.stringify(teams);
				fs.writeFile(__dirname + '/../data/teams.json', teams);
				
				return channel.send('Equipo añadido.');
			} else return channel.send('Especifica una tier válida.');
		}
	}
	
	for (let t in validTiers) {
		if (command === validTiers[t]) {
			let team = teams[command];
			if (team === undefined) return channel.send('No hay equipos de esta tier.');
			let random = Math.round(Math.random() * (team.length - 1));
			channel.send(`Random team ${command.toUpperCase()} for you: ${team[random]}`);
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