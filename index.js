const Discord = (global.Discord = require('discord.js'));
const client = (global.client = new Discord.Client());
const config = require('./config.json');
const commands = require('./commands.js');

// Ready
client.on('ready', () => {
	console.log(`I'm ready! Connected in ${client.guilds.size} ${(client.guilds.size > 1) ? 'servers' : 'server'}`);
	client.user.setActivity(`${config.prefix}help | Serving in ${client.guilds.size} ${(client.guilds.size > 1) ? 'servers' : 'server'}`);
});

// Commands and Plugins
client.on('message', async message => await commands.run(message));

// Catch errors and other data
client.on('error', (e) => console.error(e));
client.on('warn', (e) => console.warn(e));
client.on('debug', (e) => console.info(e));

// Login
client.login(config.token);