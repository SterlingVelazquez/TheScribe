const profileModel = require("../models/profileSchema");
module.exports = {
    name: 'define',
    description: 'Define word in glossary',
    async execute(client, message, args, Discord, profileData) {
        var args = await args.join(" ");

        if (!args) return message.channel.send('Incorrect input! How to use the -define command: \n-define <word> "<definition>"')
        if (!profileData) return message.channel.send('Entry does not exist in the dictionary!')

        var names = [];
        var original = [];
        var name = args.toLowerCase();
        profileData.words.forEach((e) => {
            names.push(e.name.toLowerCase());
            original.push({name: e.name, def: e.def});
        })

        if (!names.includes(name)) return message.channel.send('Entry does not exist in the dictionary!');
        
        for (var i = 0; i < names.length; i++) {
            if (names[i] === name)
                return message.channel.send(`**${original[i].name}**\n${original[i].def}`);
        }
    }
}