const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,

    async execute(client) {
        console.log(`🟢 ${client.user.username} is online!`);

        client.user.setPresence({
            activities: [
                {
                    name: `ROBLOX`,
                    type: ActivityType.Playing
                }
            ]
        });
    },
};