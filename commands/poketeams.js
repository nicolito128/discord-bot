const fs = require('fs');
const validTiers = ['ou', 'ubers', 'uu', 'pu', 'nu', 'lc'];

const init = function(message, command, args, channel) {
	let teams = {};
	teams = JSON.parse(fs.readFileSync(__dirname + '/../data/teams.json'));
	
	if (command === 'addteam') {
		if (!message.member.hasPermission('SEND_MESSAGES')) {
			return channel.send({
				embed: {
					color: 0xff0000,
					title: '**Access denied**',
					description: 'You do not have enough power to use this command'
				}
			});
		}
		
		let targets = args.join(" ");
		targets = targets.split(" ");
		
		if (!targets[0] || targets[0] === 'help') {
			return channel.send('Uso: $addteam [**tier**] [**team**]');
		}
		
		let tier = targets[0];
		let team = targets[1];
		
		if (!tier) return channel.send('Especifica una tier.');
		if (!team) return channel.send('Especifica un team.');
		
		if (team.includes('pokepast.es')) {
			for (let t in validTiers) {
				if (tier.includes(validTiers[t])) {
					if (!teams[tier]) teams[tier] = [];
					teams[tier].push(team);
					teams = JSON.stringify(teams);
					fs.writeFile(__dirname + '/../data/teams.json', teams);
					return channel.send('Equipo guardado.');
				} else return channel.send('Tier no válida.');
			}
		} else return channel.send('Utiliza la página https://pokepast.es/ para guardar un equipo.');
	}
	
	for (let t in validTiers) {
		if (command === validTiers[t]) {
			let team = teams[command];
			if (!team || team === undefined) return channel.send('No hay equipos de esta tier.');
			let random = Math.round(Math.random() * (team.length - 1));
			return channel.send(`Random team ${command.toUpperCase()} for you: ${team[random]}`);
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