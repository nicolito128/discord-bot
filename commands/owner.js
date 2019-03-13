async function init(message, user, command, args) {

    if (command === 'kill') {
        await message.channel.send('Kill in process...');
        await console.log("I'm dead!");
        process.exit();
    }
}

module.exports = {
    init,
    help: {
        cmds: ['kill'],
        permission: 'ADMINISTRATOR'
    }
};