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