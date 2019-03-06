const init = function(message, command, args, channel) {
    let text = args.join(' ');
    
    if (command === 'help' || command === 'ayuda') {
    	channel.send(`Conectado en **${client.guilds.size} ${(client.guilds.size > 1) ? 'servidores' : 'servidor'}** junto con **${client.users.size} usuarios**`);
    	channel.send(`Commands list: https://nicolito128.github.io/discord-bot/commands`);
    }
    
    if (command === 'say') {
	    if (!text) return channel.send(`Escribe un contenido para decir.`);
    	channel.send(text);
    }
    
    if (command === 'esay' || command === 'shadowsay') {
        if(!message.member.hasPermission('KICK_MEMBERS')) {
             return channel.send({embed: {
                color: 0xff0000,
                title: '**Access denied**',
                description: 'You do not have enough power to use this command'
            }});
        }
        
        if(!text) {
            return message.channel.send(`Escribe un contenido para decir.`);
        } else {
            message.channel.send(text);
            message.delete().catch(() => {});
        }
        
    }
    
    if (command === 'github') {
        let box = {embed: {
            color: 0x28a745,
            title: 'Github repository',
            url: 'https://github.com/nicolito128/discord-bot',
            description: 'A basic bot developed with discord.js',
            footer: {
                icon_url: message.author.displayAvatarURL,
                text: 'github.com/nicolito128'
            }
        }};
        channel.send(box);
    }

    if (command === 'number') {
        let number = args.join(' ');
        if (!number || number === 'help') return channel.send('Ingresa un número para obtener otro aleatorio entre 0 y tu número.');

        number = Number(number);
        if (isNaN(number)) return channel.send(`Sólo puedes ingresar números y uno sólo.`);
        if (number >= 100000000000000000) return channel.send('No voy a calcular eso.');

        let calc = Math.round(Math.random() * number);
        return channel.send(calc);
    }
};

module.exports = {
    init,
    help: {
        name: 'Basic commands',
        cmds: ['help', 'say', 'esay', 'shadowsay', 'github', 'number']
    }
};