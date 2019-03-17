const fs = require('fs');
const validTiers = ['ou', 'ubers', 'uu', 'pu', 'nu', 'lc'];

function writeTeams(teams) {
	if (!teams || teams === undefined || !typeof teams == 'object') {
		return new Error("Can't overwrite the file!");
	}
	fs.writeFileSync(__dirname + '/../data/teams.json', teams);
}

const init = async function(message, user, command, args) {
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
					await message.channel.send('Team saved successfully.');
					return writeTeams(teams);
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