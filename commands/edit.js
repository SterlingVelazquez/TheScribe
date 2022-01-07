const profileModel = require("../models/profileSchema");
module.exports = {
    name: 'edit',
    description: 'Edit word in glossary',
    async execute(client, message, args, Discord, profileData) {
        var args = await args.join(" ");
        var name = await args.slice(0, args.indexOf(`"`)).trim();
        var def = await args.slice(args.indexOf(`"`) + 1, args.lastIndexOf(`"`)).trim();
        const wrongInput = 'Incorrect input! How to use the -edit command: \n-edit <word> "<definition>"'

        if (!name || !def || !args.includes(`"`)) return message.channel.send(wrongInput)
        else if (!(/^[a-zA-Z0-9-&!?/()',: ]+$/.test(name))) 
            return message.channel.send("Only the following special characters are allowed in words: & ! ? / ( ) , : -");

        if (!profileData) return message.channel.send('Entry does not exist in the dictionary!')

        const response = await profileModel.findOneAndUpdate(
            {
                serverID: message.channel.id,
                "words.name": name,
            },
            {
                $set: {
                    "words.$.def": def
                }
            }
        ).collation(
            {
                locale: 'en_US',
                strength: 2
            }
        )
        if (!response) return message.channel.send("Entry does not exist in the dictionary!");
        return message.channel.send(`**Entry Modified** - ${name}\nNew Meaning: ${def}`);
    }
}