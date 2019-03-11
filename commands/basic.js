const init = function(message, user, command, args) {
    let text = args.join(' ');
    
    if (command === 'help' || command === 'ayuda') {
    	message.channel.send(`Connected in **${client.guilds.size} ${(client.guilds.size > 1) ? 'servers' : 'server'}** with **${client.users.size} users**`);
    	message.channel.send(`Commands list: https://nicolito128.github.io/discord-bot/commands`);
    	return;
    }
    
    if (command === 'say') {
	    if (!text) return message.channel.send(`A text is required.`);
    	return message.channel.send(text);
    }
    
    if (command === 'esay' || command === 'shadowsay') {
        if(!text) {
            return message.message.channel.send(`A text is required.`);
        } else {
            message.message.channel.send(text);
            message.delete().catch(() => {});
            return;
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
        return message.channel.send(box);
    }

    if (command === 'number') {
        let number = args.join(' ');
        if (!number || number === 'help') return message.channel.send('Enter a number to return another number between 0 and your number.');

        number = Number(number);
        if (isNaN(number)) return message.channel.send(`Invalid value! enter only numbers`);
        if (number >= 100000000000000000) return message.channel.send("I'm not going to calculate that");

        let calc = Math.round(Math.random() * number);
        return message.channel.send(calc);
    }
};

module.exports = {
    init,
    help: {
        name: 'Basic commands',
        cmds: ['help', 'say', 'esay', 'shadowsay', 'github', 'number']
    }
};