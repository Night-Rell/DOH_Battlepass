const { ModalSubmitInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


const codeSystem = require("../../Shemas/bp_codes");
const battlepassDB  = require("../../Shemas/battlepass");

module.exports = {
    id: 'add-code-modal',
    /**
     * 
     * @param {ModalSubmitInteraction} interaction 
     */

    async execute(interaction, client) {

        const { fields, member, guild, user } = interaction;

        let db = await codeSystem.findOne({ guildID: guild.id });
        let user_db = await battlepassDB.findOne({ userID: user.id });

        const codeName = fields.getTextInputValue(`code-name`);
        const codeLimit = Number(fields.getTextInputValue(`code-limit`));
        const codeMessages = Number(fields.getTextInputValue(`code-quantity`));
         
        const addCodesBtn = new ButtonBuilder().setCustomId('add-code').setLabel('Добавить код').setStyle(ButtonStyle.Success).setEmoji('<:add:1325923490485768233>')
        
        const removeCodesBtn = new ButtonBuilder().setCustomId('remove-code').setLabel('Удалить код').setStyle(ButtonStyle.Danger).setEmoji('<:delete:1325923517455405291>')

        db.activeCodes.push({ 'Name': codeName, 'Limit': codeLimit > 0 ? codeLimit : 'Ꝏ', 'Activators': 0, 'Reward': codeMessages });
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


        let embed = new EmbedBuilder()
        .setColor('Blurple')
        .setAuthor({ name: `Коды ${guild.name}`, iconURL: guild.iconURL({ forceStatic: false }) })
        .setTitle(`Код успешно добавлен`)
        .setDescription(`**Название**: ${codeName}\n**Кол. активаций:** ${codeLimit > 0 ? codeLimit : 'неограничено'}\n**Награда:** ${codeMessages} сообщений`)
        .setThumbnail(`${user.avatarURL()}`)
    
        await interaction.reply({ embeds: [embed], ephemeral: true })
        await interaction.message.edit({ content: ``, embeds: [startEmbed], components: [new ActionRowBuilder().setComponents(addCodesBtn, removeCodesBtn)] });
    
        setTimeout(async () => {
            addCodesBtn.setDisabled(true);
            removeCodesBtn.setDisabled(true);
            
            interaction.message.edit({ components: [new ActionRowBuilder().setComponents(addCodesBtn, removeCodesBtn)] });
        }, 15000);
    },
};
