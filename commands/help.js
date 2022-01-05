module.exports = {
    name: "help",
    description: "Get list of commands",
    execute(client, message, args, discord, profileData) {
        const embed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`List of Commands`)
            .setDescription(`Use a hyphen prefix (-) before each command to execute the following.\n
                Note: Must have Scroll Keeper role to add, edit, and delete data from the glossary.`)
            .setThumbnail('https://i.imgur.com/dnCHzsK.png')
            .addField('Commands', 
                `**Add** (-add <word> "<definition>") \nAdd an entry\n
                **Edit** (-edit <word> "<definition>") \nEdit an entry\n
                **Delete** (-delete <word>) \nDelete an entry\n
                **Define** (-define <word>) \nGet the definition of an entry\n
                **All** (-all) \nList all available entries\n
                **Help** (-help) \nDisplay a list of all commands`)

        message.channel.send({ embeds: [embed] })
    }
}