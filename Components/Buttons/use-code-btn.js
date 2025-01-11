const { CommandInteraction, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonInteraction } = require('discord.js');

const battlepassDB = require("../../Shemas/battlepass");

module.exports = {
    id: 'use-code',
    name: 'Promocode button',
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {

        if (interaction.message.interaction.user.id !== interaction.user.id) {

            return interaction.reply({ content: `Это не ваша интеракция`, ephemeral: true });

        } else {

            let db = await battlepassDB.findOne({ userId: interaction.user.id });

            if (!db.activatedCodes) {
                db.activatedCodes = [];
                await db.save();
            }
            
            const modal = new ModalBuilder()
                .setCustomId('promocode-modal')
                .setTitle('Система кодов')
                .setComponents(
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setCustomId('check-code')
                            .setLabel(`Введите код`)
                            .setPlaceholder(`> Вводить сюда`)
                            .setMaxLength(50)
                            .setRequired(true)
                            .setStyle(TextInputStyle.Short)
                    ),
                )

            await interaction.showModal(modal);
        }
    }
};