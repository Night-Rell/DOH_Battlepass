
module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {

        if (interaction.isButton()) {
            const button = client.buttons.get(interaction.customId);

            if (button.permissions && !interaction.member.permissions.has(button.permissions)) {
                return interaction.reply({ content: `Нет прав.`, ephemeral: true })
            };

            button.execute(interaction, client)
            return
        };

        if (interaction.isModalSubmit()) {
            const modal = client.modals.get(interaction.customId);
            modal.execute(interaction, client)
            return
        };

        if (interaction.isStringSelectMenu()) {
            const selectMenu = client.selectMenus.get(interaction.customId)
            selectMenu.execute(interaction, client);
            return
        }

    }
}