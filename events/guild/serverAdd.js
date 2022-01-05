const profileModel = require("../../models/profileSchema");

module.exports = async (client, discord, member) => {
    let profile = await profileModel.create({
        serverID: member.channel.id,
        words: []
    })
    profile.save();
}