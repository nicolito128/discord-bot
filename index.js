const Discord = require("discord.js");
const commands = require('./commands.js');

// Globals
const client = (global.client = new Discord.Client());
const config = (global.config = require("./config.json"));

// Ready
client.on("ready", () => {
	console.log(`¡Estoy listo! Conectado en ${client.guilds.size} ${(client.guilds.size > 1) ? "servidores" : "servidor"}`);
	client.user.setActivity(`Sirviendo en ${client.guilds.size} ${(client.guilds.size > 1) ? "servidores" : "servidor"}`);
});

// Commands and Plugins
client.on("message", message => commands.loadCommands(message));

// Catch errors and other data
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

// Login
client.login(config.token);