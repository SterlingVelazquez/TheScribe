const profileModel = require("../models/profileSchema");
module.exports = {
    name: 'delete',
    description: 'Delete word in glossary',
    async execute(client, message, args, Discord, profileData) {
        var args = await args.join(" ");
        const wrongInput = 'Incorrect input! How to use the -delete command: \n-delete <word> "<definition>"'

        if (!args) return message.channel.send(wrongInput)
        if (!profileData) return message.channel.send('Entry does not exist in the dictionary!')

        const response = await profileModel.findOneAndUpdate(
            {
                serverID: message.channel.id,
                "words.name": args,
            },
            {
                $pull: {
                    words: {
                        name: args
                    }
                }
            }
        ).collation(
            {
                locale: 'en_US',
                strength: 2
            }
        )
        if (!response) return message.channel.send("Entry does not exist in the dictionary!");
        return message.channel.send(`**Entry Deleted** - ${args}`);
    }
}