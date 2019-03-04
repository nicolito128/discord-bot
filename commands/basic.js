const init = function(message, command, args, channel) {
    if (command === 'help' || command === 'ayuda') {
    	channel.send(`Conectado en **${client.guilds.size} ${(client.guilds.size > 1) ? "servidores" : "servidor"}** junto con **${client.users.size} usuarios**`);
    	channel.send(`Commands list: https://pastebin.com/raw/i9gRRsBr`);
    }
    
    if (command === 'say') {
        let texto = args.join(" ");
	    if (!texto) return channel.send(`Escribe un contenido para decir.`);
    	channel.send(texto);
    }
    
    if (command === 'github') {
        channel.send('Github repository: https://github.com/nicolito128/discord-bot');
    }

    if (command === 'number') {
        let number = args;
        if (!number || number === 'help') return channel.send('Ingresa un número para obtener otro aleatorio entre 0 y tu número.');

        number = Number(number);
        if (isNaN(number)) return channel.send(`Sólo puedes ingresar números.`);
        if (number >= 100000000000000000) return channel.send('No voy a calcular eso.');

        let calc = Math.round(Math.random() * number);
        return channel.send(calc);
    }
};

exports.init = init;