const fs = require('fs');
const validTiers = ['ou', 'ubers', 'uu', 'pu', 'nu', 'lc'];

function writeTeams(teams) {
	if (!teams || teams === undefined || !typeof teams == 'object') {
		return new Error("Can't overwrite the file!");
	}
	fs.writeFileSync(__dirname + '/../data/teams.json', teams);
}

let teams = JSON.parse(fs.readFileSync(__dirname + '/../data/teams.json'));

const commands = {
	addteam: async function(message, user, command, args) {
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
	},
	
	team: function(message, user, command, args) {
		let team = teams[args];
		
		if (!team || team === undefined) return message.channel.send('There are not teams in this tier.');
		
		let random = Math.round(Math.random() * (team.length - 1));
		return message.channel.send(`A random team ${command.toUpperCase()} for you: ${team[random]}`);
	}
};

exports.commands = commands;