const { SlashCommandBuilder, CommandInteraction, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder,  AttachmentBuilder, StringSelectMenuOptionBuilder, PermissionFlagsBits, } = require('discord.js');

const { generateImage } = require("../../Utils/generate_pass");

const battlepassDB = require("../../Shemas/battlepass");


module.exports = {
    category: 'administrator',
    data: new SlashCommandBuilder()
        .setName('pass')
        .setDescription('просмотреть прогресс в пассе')
    ,
    /**
     * 
    * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {

        const { guild, user } = interaction;

        let user_bp = await battlepassDB.findOne({ userId: user.id })

        if (!user_bp) {
            user_bp = battlepassDB.create({
                userId: interaction.user.id
            })
        }

        const imageBuffer = await generateImage(user.id, user_bp.has_goldpass);
        const attachment = new AttachmentBuilder(imageBuffer, {name: 'image.png'});

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('Blurple')
                    .setAuthor({
                        name: `Прогресс ${user.username}`,
                        iconURL: user.avatarURL({ forceStatic: false })
                    })
                    .setDescription(`У вас сейчас ${user_bp.level} уровень пасса`)
                    .setFooter({ text: user_bp.messageCount >= 5000 ? `пасс пройден (5 уровень)` : `${user_bp.messageCount} / ${user_bp.to_levelUp}` })
                    .setImage('attachment://image.png')
            ], files: [attachment]

            // components: [
            //     new ActionRowBuilder().setComponents(
            //         new StringSelectMenuBuilder()
            //             .setCustomId(`staff_selectMenu_start`)
            //             .setPlaceholder('Выберите желаемую должность')
            //             .setMaxValues(1)
            //             .setOptions(
            //                 new StringSelectMenuOptionBuilder()
            //                     .setLabel('Модератор')
            //                     .setValue('moderator'),

            //                 new StringSelectMenuOptionBuilder()
            //                     .setLabel('Организатор мероприятий')
            //                     .setValue('eventolog')
            //             )

            //     )
            // ]
        });

        // const db = await Staff.findOne({ guildId: interaction.guildId })
        // if (!db) {
        //     Staff.create({
        //         guildName: guild.name,
        //         guildId: interaction.guildId,
        //         moderator: false,
        //         eventolog: false,
        //     });

        //     return interaction.reply({ content: `Создан профиль в базе данных.`, ephemeral: true })
        // };


    },
}