const { Client, CommandInteraction } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @returns 
     */
    async execute(interaction, client) {
        if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
            const { commands } = client;
            const { commandName } = interaction;

            const command = commands.get(commandName);

            if (!command) return
            await command.execute(interaction, client);

        }
    }
}