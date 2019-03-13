const kisses = require('../data/kisses.js');

function init(message, user, command, args) {
    const targetUser = message.mentions.users.first();
    const randomKiss = kisses[Math.round(Math.random() * (kisses.length - 1))];
    
    if (message.mentions.users.size < 1) return message.reply('You have to mention someone.');
    
    let embed = new Discord.RichEmbed()
        .setColor(randomKiss.color)
        .setImage(randomKiss.link);
    message.channel.send(`**${user} kissed ${targetUser}**!!`);
    return message.channel.send(embed);
}

module.exports = {
    init,
    help: {
        cmds: ['kiss', 'chu']
    }
}