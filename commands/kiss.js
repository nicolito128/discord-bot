const kisses = [
    {
        link: 'https://media.giphy.com/media/hgcqkgBLCbwl2/giphy.gif',
        color: 0x5363B0
    },
    {
        link: 'https://media.giphy.com/media/HKQZgx0FAipPO/giphy.gif',
        color: 0x3A627A
    },
    {
        link: 'https://media.giphy.com/media/5GdhgaBpA3oCA/giphy.gif',
        color: 0xD4AA32
    },
    {
        link: 'https://media.giphy.com/media/CE1sk31EVmjNS/giphy.gif',
        color: 0xCA3131
    }
];

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