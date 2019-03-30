const kisses = require('../data/kisses.js');
// https://nekos.life/api/kiss

let commands = {
    kiss: function(message, user, command, args) {
        const targetUser = message.mentions.users.first();
        const randomKiss = kisses[Math.round(Math.random() * (kisses.length - 1))];
    
        if (message.mentions.users.size < 1) return message.reply('You have to mention someone.');
        
        let embed = new Discord.RichEmbed()
            .setColor(randomKiss.color)
            .setImage(randomKiss.link);
        message.channel.send(`**${user} kissed ${targetUser}**!!`);
        return message.channel.send(embed);
    }
    
};
commands['chu'] = commands.kiss;

exports.commands = commands;