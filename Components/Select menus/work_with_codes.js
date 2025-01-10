const { StringSelectMenuBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits, StringSelectMenuInteraction } = require('discord.js');

const codeSystem = require('../../Shemas/bp_codes');

module.exports = {
    id: 'work_with_codes',
    /**
     * 
     * @param {StringSelectMenuInteraction} interaction 
     */
    async execute(interaction, client) {

        const { values, member, component, guild, user, message } = interaction;

        const db = await codeSystem.findOne({ guildID: guild.id });


        const selectedValue = values[0];

        const selectedIndex = db.activeCodes.findIndex((_, index) => `value_${index}` === selectedValue)

        const selectedOption = db.activeCodes[selectedIndex];

        let embed = new EmbedBuilder()
        .setColor('Blurple')
        .setAuthor({ name: `Коды ${guild.name}`, iconURL: guild.iconURL({ forceStatic: false }) })
        .setTitle(`Код успешно удален`)
        .setDescription(`**Название**: ${selectedOption['Name']}\n**Кол. активаций:** ${selectedOption['Limit'] > 0 ? selectedOption['Limit'] : 'неограничено'}\n**Награда:** ${selectedOption['Reward']} сообщений`)
        .setThumbnail(`${user.avatarURL()}`)

        const addCodesBtn = new ButtonBuilder().setCustomId('add-code').setLabel('Добавить код').setStyle(ButtonStyle.Success).setEmoji('<:add:1325923490485768233>')
        
        const removeCodesBtn = new ButtonBuilder().setCustomId('remove-code').setLabel('Удалить код').setStyle(ButtonStyle.Danger).setEmoji('<:delete:1325923517455405291>')

        try {

            db.activeCodes.splice(selectedIndex, 1);
            await db.save();

            const listMessage = db.activeCodes.length > 0
            ? db.activeCodes.map((item, index) => `${index + 1}. ${item['Name']} (${item['Limit'] > 0 ? ` 0 / ${item['Limit']}` : ` ${item['Limit']}`} активаций )  -->  ${item['Reward']} сообщений`).join('\n')
            : 'нету действующих кодов';

            const startEmbed = new EmbedBuilder()
            .setColor('Blurple')
            .setAuthor({
                name: `Коды ${guild.name}`,
                iconURL: guild.iconURL({ forceStatic: false })
            })
            .setDescription(
                `> ${member},  выберите нужную функцию.\n\n**Список действующих кодов:**\n\n${listMessage}`
            )
            .setThumbnail(`${user.avatarURL()}`)

            await interaction.reply({ embeds: [embed], ephemeral: true })
            await interaction.message.edit({ embeds: [startEmbed], components: [new ActionRowBuilder().setComponents(addCodesBtn, removeCodesBtn)] })
        
            setTimeout(async () => {
                addCodesBtn.setDisabled(true);
                removeCodesBtn.setDisabled(true);
                
                interaction.message.edit({ components: [new ActionRowBuilder().setComponents(addCodesBtn, removeCodesBtn)] });
            }, 30000);

        } catch(err) {
            console.log(err);
        }
    }
};