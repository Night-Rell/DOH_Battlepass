const { SlashCommandBuilder, CommandInteraction, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle } = require('discord.js');

const codeSystem = require('../../Shemas/bp_codes');
const battlepassDB = require('../../Shemas/battlepass');

module.exports = {
    category: 'administrator',
    data: new SlashCommandBuilder()
        .setName('codes')
        .setDescription('Панель управления кодами')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    /**
     * 
    * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { guild } = interaction;

        const addCodesBtn = new ButtonBuilder().setCustomId('add-code').setLabel('Добавить код').setStyle(ButtonStyle.Success).setEmoji('<:add:1325923490485768233>')

        const removeCodesBtn = new ButtonBuilder().setCustomId('remove-code').setLabel('Удалить код').setStyle(ButtonStyle.Danger).setEmoji('<:delete:1325923517455405291>')

        
        let db = await codeSystem.findOne({ guildID: guild.id });
        if (!db) {
            db = codeSystem.create({
                guildID: guild.id,
            });

            return interaction.reply(`Создан профиль в базе данных`)
        };

        
        const listMessage = db.activeCodes.length > 0
            ? db.activeCodes.map((item, index) => `${index + 1}. ${item['Name']} (${item['Limit'] > 0 ? ` ${item['Activators']} / ${item['Limit']}` : ` ${item['Limit']}`} активаций )  -->  ${item['Reward']} сообщений`).join('\n')
            : 'нету действующих кодов';


        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('Blurple')
                    .setAuthor({
                        name: `Коды ${guild.name}`,
                        iconURL: guild.iconURL({ forceStatic: false })
                    })
                    .setDescription(
                        `> ${interaction.member},  выберите нужную функцию.\n\n**Список действующих кодов:**\n\n${listMessage}`
                    )
                    .setThumbnail(`${interaction.user.avatarURL()}`)
            ],

            components: [
                new ActionRowBuilder().setComponents(addCodesBtn, removeCodesBtn)
            ]
        });

        setTimeout(async () => {
            addCodesBtn.setDisabled(true);
            removeCodesBtn.setDisabled(true);
            
            interaction.editReply({ components: [new ActionRowBuilder().setComponents(addCodesBtn, removeCodesBtn)] });
        }, 15000);
    },
}