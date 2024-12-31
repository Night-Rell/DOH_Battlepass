const { CommandInteraction, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    id: 'verify-btn',
    name: 'game button',
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {

        const randomCode = generateRandomCode()

        const modal = new ModalBuilder()
            .setCustomId('verify-modal')
            .setTitle('Верификация')
            .setComponents(
                new ActionRowBuilder().setComponents(
                    new TextInputBuilder()
                        .setCustomId('verify-code')
                        .setLabel(`Введите код: ${randomCode}`)
                        .setMaxLength(10)
                        .setRequired(true)
                        .setStyle(TextInputStyle.Short)
                ),
            )


        const db = await verifySystem.findOne({ userId: interaction.user.id });
        if (!db) {
            await verifySystem.create({
                guildId: interaction.guildId,
                userId: interaction.user.id,
                userName: interaction.user.username,
                randomCode: randomCode
            })
            return interaction.showModal(modal);
        }

        db.randomCode = randomCode;
        db.save();
    
        function generateRandomCode() {
            return Math.floor(1000 + Math.random() * 9000).toString();
        }
        
        await interaction.showModal(modal);
    }
};