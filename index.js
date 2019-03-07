const Discord = (global.Discord = require("discord.js"));
const client = (global.client = new Discord.Client());

const config = require('./config.json');
const commands = require('./commands.js');

// Ready
client.on("ready", () => {
	console.log(`¡Estoy listo! Conectado en ${client.guilds.size} ${(client.guilds.size > 1) ? "servidores" : "servidor"}`);
	client.user.setActivity(`${config.prefix}help | Sirviendo en ${client.guilds.size} ${(client.guilds.size > 1) ? "servidores" : "servidor"}`);
});

// Commands and Plugins
client.on("message", async message => await commands.run(message));

// Catch errors and other data
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

// Login
client.login(config.token);