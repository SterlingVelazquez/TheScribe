module.exports = {
    name: "all",
    permissions: [],
    description: "Get all dictionary entries",
    execute(client, message, args, discord, profileData) {
        if (!profileData || profileData.words.length === 0) return message.channel.send('There are no words in the dictionary, yet.');

        let names = [], firstLetters = [], response = ``;
        profileData.words.forEach((e) => {
            names.push(e.name);
            firstLetters.push(e.name.charAt(0));
        })

        names.sort(); firstLetters.sort();
        let uniqueArr = [... new Set(firstLetters)];

        for (let i = 0; i < uniqueArr.length; i++) {
            let resultArr = names.filter(name => name.charAt(0) === uniqueArr[i]); 
            response += `**${uniqueArr[i].toUpperCase()}**\n${resultArr.join(', ')}\n\n`
        }

        const embed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`The Scribe's Glossary`)
            .setDescription(`An archive of all the knowledge the scribe has attained during his stay.`)
            .setThumbnail('https://i.imgur.com/dnCHzsK.png')
            .addField('Contents', response)

        message.channel.send({ embeds: [embed] })
    }
}