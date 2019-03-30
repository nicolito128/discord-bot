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

const commands = {
    timezone: async function(message, user, command, args) {
        let targets = args.join(' ');
        let country;
        targets = targets.split(' ');
    
        if (targets.length > 1) return message.channel.send('You can only enter a country.');
        country = await getCountry(targets[0]);
    
        if (!country || country == undefined) return message.channel.send('Country not found');
        
        return message.channel.send(`**${country.name} timezone**: ${country.timezones}`);
    },
    population: async function(message, user, command, args) {
        let targets = args.join(' '),
        country;
        targets = targets.split(' ');
    
        if (targets.length > 1) return message.channel.send('You can only enter a country.');
        country = await getCountry(targets[0]);
    
        if (!country || country == undefined) return message.channel.send('Country not found');
        
        return message.channel.send(`**Population**: ${country.population}`);
    },
    flag: async function(message, user, command, args) {
        let targets = args.join(' '),
        country;
        targets = targets.split(' ');
    
        if (targets.length > 1) return message.channel.send('You can only enter a country.');
        country = await getCountry(targets[0]);
    
        if (!country || country == undefined) return message.channel.send('Country not found');
        
        
        let embed = new Discord.RichEmbed()
            .setImage(`https://countryflags.io/${country.alpha2Code}/shiny/64.png`);
        message.channel.send(`**${country.altSpellings[country.altSpellings.length - 1]}**`);
        
        return message.channel.send(embed);
    }
};

exports.commands = commands;