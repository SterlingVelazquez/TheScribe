require('dotenv').config();
const profileModel = require("../../models/profileSchema");

module.exports = async (Discord, client, message) => {
    const prefix = process.env.PREFIX;
    const restricted = ["add", "edit", "delete"];

    let admin = message.member.permissions.has('ADMINISTRATOR');
    console.log(admin)

    /* let role = message.guild.roles.cache.find(r => r.name === "Scroll Keeper");
    console.log(role);
    if (!role) message.guild.roles.create({
        data: {
            name: "#Scroll Keeper"
        }
    }) */

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let profileData;
    try {
        profileData = await profileModel.findOne({ serverID: message.channel.id });
        if (!profileData) {
            let profile = await profileModel.create({
                serverID: message.channel.id,
                words: []
            })
            profile.save();
        }
    } catch (err) {
        console.log(err)
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    if (!admin && !message.member.roles.cache.some(r => r.name == "Scroll Keeper") && 
        command.name && restricted.includes(command.name))
        return message.channel.send(`Must have *Scroll Keeper* role to use '-${command.name}' command! yomama`)

    if (command) command.execute(client, message, args, Discord, profileData);
}