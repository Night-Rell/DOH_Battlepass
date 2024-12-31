const { SlashCommandBuilder, CommandInteraction, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, PermissionFlagsBits, } = require('discord.js');


module.exports = {
    category: 'administrator',
    data: new SlashCommandBuilder()
        .setName('staff')
        .setDescription('Набор в стаф')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    /**
     * 
    * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {

        const { guild } = interaction;

        interaction.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('Grey')
                    .setAuthor({
                        name: `Вакансии ${guild.name}`,
                        iconURL: guild.iconURL({ forceStatic: false })
                    })
                    .setDescription(
                        `Здесь проходит набор участников в **стафф** сервера. Задача любой ветви стаффа, какую вы бы не выбрали, поддерживать стабильную работу сервера и адекватное общение между участниками.\n\n`
                        + `Старайтесь писать анкету без ошибок и выражать свои мысли открыто. Чем интереснее ваша анкета, тем больше у вас шансов попасть в наш коллектив`
                    )
                    .setThumbnail('https://media.discordapp.net/attachments/1052928754411917323/1210998502340034692/1.png?ex=6753d9fe&is=6752887e&hm=889616709ac02b08231225c472d0d79eaa90e189b14f76aed4498bae5bd6acf6&=&format=webp&quality=lossless&width=1202&height=676')
                    .setImage(`https://cdn.discordapp.com/attachments/1057040405633441813/1113184771951042581/1667720035_3-31.png`)
            ],

            components: [
                new ActionRowBuilder().setComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId(`staff_selectMenu_start`)
                        .setPlaceholder('Выберите желаемую должность')
                        .setMaxValues(1)
                        .setOptions(
                            new StringSelectMenuOptionBuilder()
                                .setLabel('Модератор')
                                .setValue('moderator'),

                            new StringSelectMenuOptionBuilder()
                                .setLabel('Организатор мероприятий')
                                .setValue('eventolog')
                        )

                )
            ]
        });

        const db = await Staff.findOne({ guildId: interaction.guildId })
        if (!db) {
            Staff.create({
                guildName: guild.name,
                guildId: interaction.guildId,
                moderator: false,
                eventolog: false,
            });

            return interaction.reply({ content: `Создан профиль в базе данных.`, ephemeral: true })
        };

        return interaction.reply({ content: `Сообщение отправлено.`, ephemeral: true })

    },
}