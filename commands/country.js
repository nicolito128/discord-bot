const fetch = require('node-fetch');

async function getCountry(countryName) {
    try {
        let response = await fetch(`https://restcountries.eu/rest/v2/name/${countryName}`);
        let country = await response.json();
        return country[0];
    } catch(err) {
        return new Error('Error consulting the API');
    }
}

const init = async function(message, user, command, args){
    let targets = args.join(' '),
        country;
    targets = targets.split(' ');
    
    if (targets.length > 1) return message.channel.send('You can only enter a country.');
    country = await getCountry(targets[0]);
    
    if (!country || country == undefined) return message.channel.send('Country not found');
    
    message.channel.send(country.timezones);
};

module.exports = {
    init,
    help: {
        cmds: ['timezones', 'timezone']
    }
};