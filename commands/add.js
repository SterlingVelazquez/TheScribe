const profileModel = require("../models/profileSchema");
module.exports = {
    name: 'add',
    description: 'Add word to the glossary',
    async execute(client, message, args, Discord, profileData) {
        var args = await args.join(" ");
        var name = await args.slice(0, args.indexOf(`"`)).trim();
        var def = await args.slice(args.indexOf(`"`) + 1, args.lastIndexOf(`"`)).trim();
        const wrongInput = 'Incorrect input! How to use the -add command: \n-add <word> "<definition>"'

        if (!name || !def || (name === def)) return message.channel.send(wrongInput)
        else if (!(/^[a-zA-Z0-9-&!?/()',: ]+$/.test(name))) 
            return message.channel.send("Only the following special characters are allowed in words: & ! ? / ( ) , : -");

        var insert = {name: name, def: def};
        var names = [];

        if (!profileData) {
            let profile = await profileModel.create({
                serverID: message.channel.id,
                words: []
            })
            profile.save();
        } else {
            profileData.words.forEach((e) => {
                names.push(e.name);
            })
        }

        if (names.includes(name)) return message.channel.send(`Entry already exists. Use -edit instead to overwrite.`);

        const response = await profileModel.findOneAndUpdate(
            {
                serverID: message.channel.id
            },
            {
                $push: {
                    words: insert
                }
            }
        )
        return message.channel.send(`**New Entry Added** - ${name}\nMeaning: ${def}`);
    }
}