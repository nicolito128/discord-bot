const kisses = [
    'https://media.giphy.com/media/hgcqkgBLCbwl2/giphy.gif',
    'https://media.giphy.com/media/HKQZgx0FAipPO/giphy.gif',
    'https://media.giphy.com/media/5GdhgaBpA3oCA/giphy.gif',
    'https://media.giphy.com/media/CE1sk31EVmjNS/giphy.gif'
];

function init(message, user, command, args) {
    const targetUser = message.mentions.users.first();
    const randomKiss = kisses[Math.round(Math.random() * (kisses.length - 1))];
    
    if (message.mentions.users.size < 1) return message.reply('You have to mention someone.');
    
    let embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setImage(randomKiss);
    message.channel.send(`**${user} kissed ${targetUser}**!!`);
    return message.channel.send(embed);
}

module.exports = {
    init,
    help: {
        cmds: ['kiss', 'chu']
    }
}