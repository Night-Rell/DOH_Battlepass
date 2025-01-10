const { CommandInteraction, ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonInteraction } = require('discord.js');

module.exports = {
    id: 'add-code',
    name: 'addCode button',
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {

        const modal = new ModalBuilder()
        .setCustomId('add-code-modal')
        .setTitle('Добавить код')
        .setComponents(
            new ActionRowBuilder().setComponents(
                new TextInputBuilder()
                    .setCustomId('code-name')
                    .setLabel(`Название кода`)
                    .setMaxLength(50)
                    .setRequired(true)
                    .setStyle(TextInputStyle.Short)
            ),
            new ActionRowBuilder().setComponents(
                new TextInputBuilder()
                    .setCustomId('code-limit')
                    .setLabel(`Количество активаций`)
                    .setPlaceholder(`0 если бесконечное`)
                    .setMaxLength(3)
                    .setRequired(true)
                    .setStyle(TextInputStyle.Short)
            ),

            new ActionRowBuilder().setComponents(
                new TextInputBuilder()
                    .setCustomId('code-quantity')
                    .setLabel(`Количество сообщений`)
                    .setPlaceholder(`0 не указывать!!!!`)
                    .setMaxLength(5)
                    .setRequired(true)
                    .setStyle(TextInputStyle.Short)
            )
        )

        await interaction.showModal(modal);
    }





        
        // const chooseCode = new ActionRowBuilder().setComponents(
        //     new StringSelectMenuBuilder()
        //         .setCustomId(`work_with_codes`)
        //         .setPlaceholder('Выберите желаемую должность')
        //         .setMaxValues(1)
        //         .setOptions(
        //             new StringSelectMenuOptionBuilder()
        //                 .setLabel('Модератор')
        //                 .setValue('moderator'),

        //             new StringSelectMenuOptionBuilder()
        //                 .setLabel('Организатор мероприятий')
        //                 .setValue('eventolog')
        //         )

        // )
};












