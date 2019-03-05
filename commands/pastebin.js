const paste = require('better-pastebin');

paste.setDevKey("devKey"); // https://pastebin.com/api

const init = function(message, command, args, channel) {
    
    
    if (command === "paste" || command === "pastebin" || command === "newpaste") {
        let text = args.join(' ');
        if (!text) return channel.send('Ingresa un texto el cual escribir.');
        paste.create({
            contents: text,
            name: 'Untitle',
            privacy: '0'
        }, (success, data) => {
            if (success) {
                channel.send(data);
            } else {
                console.log(data);
            }
        });
    }
};

module.exports = {
    init,
    help: {
        name: 'Pastebin',
        cmds: ['paste', 'pastebin', 'newpaste']
    }
};