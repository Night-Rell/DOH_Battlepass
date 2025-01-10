const { CommandInteraction, ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonInteraction, SelectMenuBuilder } = require('discord.js');

const codeSystem = require('../../Shemas/bp_codes');

module.exports = {
    id: 'remove-code',
    name: 'removeCode button',
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {

        let db = await codeSystem.findOne({ guildID: interaction.guild.id });

        let embed = new EmbedBuilder()
        .setColor('Blurple')
        .setAuthor({
            name: `Коды ${interaction.guild.name}`,
            iconURL: interaction.guild.iconURL({ forceStatic: false })
        })
        .setDescription(
            `> ${interaction.member}, выберите ниже код, который хотите удалить`
        )
        .setThumbnail(`${interaction.user.avatarURL()}`)


        const chooseCode = new StringSelectMenuBuilder()
            .setCustomId(`work_with_codes`)
            .setPlaceholder('Выберите код')
            .addOptions(
                db.activeCodes.map((item, index) => ({
                    label: `${item['Name']}  -->  ${item['Reward']} сообщений`,
                    value: `value_${index}`,
                    emoji: `<:square:1326266636495224832>`
                }))
            )

        await interaction.message.edit({ embeds: [embed], components: [new ActionRowBuilder().addComponents(chooseCode)] });

        setTimeout(async () => {
            chooseCode.setDisabled(true)
            
            interaction.message.edit({ components: [new ActionRowBuilder().setComponents(chooseCode)] });
        }, 30000);

    }
};












