const { StringSelectMenuBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const { KURATOR_ROLE_ID, MODERATOR_ROLE_ID, EVENTOLOG_ROLE_ID } = require('../../config.json');

module.exports = {
    id: 'staff_selectMenu_start',
    /**
     * 
     * @param {StringSelectMenuBuilder} interactioon 
     */
    async execute(interaction, client) {

        const { values, member, component, guild, } = interaction;

        const db = await Staff.findOne({ guildId: guild.id });

        if (!db) return interaction.reply({ content: `**Что то пошло не так, скорее всего в БД нет информации о наборах**`, ephemeral: true })

        const moderatorEmbed = new EmbedBuilder()
            .setColor('LightGrey')
            .setAuthor({
                name: `Вакансии ${guild.name}`,
                iconURL: guild.iconURL({ forceStatic: false })
            })
            .setDescription(
                `Требуются пользователи на должность - <@&${MODERATOR_ROLE_ID}>\n\n`
                + `Данная должность следит за поведением участников сервера в текстовых или голосовых каналах и в случаи нарушения выдавать наказание.\n\n`
                + `**Что тебя ждёт:**\n`
                + `- Зарплата от коллектива сервера\n`
                + `- Мероприятия только среди персонала\n`
                + `- Возможность получить ценный опыт и карьерный рост\n\n`
                + `**Требования:**\n`
                + `- 14+ лет\n`
                + `- знание основных правил сервера\n`
                + `- знание базовых команд модерации\n`
                + `- быть стрессоустойчивым\n`
                + `- желание работать\n`
            )

        const eventologEmbed = new EmbedBuilder()
            .setColor('LightGrey')
            .setAuthor({
                name: `Вакансии ${guild.name}`,
                iconURL: guild.iconURL({ forceStatic: false })
            })
            .setDescription(
                `Требуются пользователи на должность - <@&${EVENTOLOG_ROLE_ID}>\n\n`
                + `Данная должность отвечает за проведение мероприятий и розыгрышей.\n\n`
                + `**Что тебя ждет:**\n`
                + `- Зарплата от коллектива сервера\n`
                + `- Мероприятия только среди персонала\n`
                + `- Возможность получить ценный опыт и карьерный рост\n\n`
                + `**Требования:**\n`
                + `- 14+ лет\n`
                + `- хороший микрофон\n`
                + `- знание основных правил сервера\n`
                + `- креативность\n`
                + `- быть стрессоустойчивым\n`
                + `- желание работать\n`
            )

        const moderatorAnketaBtn = new ButtonBuilder()
            .setCustomId('moderatorAnketaBtn')
            .setLabel('ㅤㅤㅤПодать анкетуㅤㅤㅤ')
            .setStyle(ButtonStyle.Secondary)

        const openRequestModeratorBtn = new ButtonBuilder()
            .setCustomId('openRequestModeratorBtn')
            .setLabel('Открыть набор')
            .setStyle(ButtonStyle.Success)

        const closeRequestModeratorBtn = new ButtonBuilder()
            .setCustomId('closeRequestModeratorBtn')
            .setLabel('Закрыть набор')
            .setStyle(ButtonStyle.Danger)

        const eventologAnketaBtn = new ButtonBuilder()
            .setCustomId('eventologAnketaBtn')
            .setLabel('ㅤㅤㅤПодать анкетуㅤㅤㅤ')
            .setStyle(ButtonStyle.Secondary)

        const openRequestEventologBtn = new ButtonBuilder()
            .setCustomId('openRequestEventologBtn')
            .setLabel('Открыть набор')
            .setStyle(ButtonStyle.Success)

        const closeRequestEventologBtn = new ButtonBuilder()
            .setCustomId('closeRequestEventologBtn')
            .setLabel('Закрыть набор')
            .setStyle(ButtonStyle.Danger)

        switch (values[0].toString()) {

            case 'moderator': {
                
                await interaction.deferReply({ ephemeral: true });
                await sleep(100);
                function sleep(ms) {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }
                if (db.moderator) {

                    if (KURATOR_ROLE_ID.some(roleID => member.roles.cache.has(roleID)) || member.permissions.has(PermissionFlagsBits.Administrator)) {
                        return interaction.editReply({ ephemeral: true, embeds: [moderatorEmbed], components: [new ActionRowBuilder().setComponents(moderatorAnketaBtn, closeRequestModeratorBtn)] });
                    };

                    return interaction.editReply({ ephemeral: true, embeds: [moderatorEmbed], components: [new ActionRowBuilder().setComponents(moderatorAnketaBtn)] })
                };

                if (KURATOR_ROLE_ID.some(roleID => member.roles.cache.has(roleID)) || member.permissions.has(PermissionFlagsBits.Administrator)) {

                    return interaction.editReply({ ephemeral: true, embeds: [moderatorEmbed], components: [new ActionRowBuilder().setComponents(moderatorAnketaBtn, openRequestModeratorBtn)] });
                }

                return interaction.editReply({ content: `Сервер пока не нуждается в модераторах`, ephemeral: true });
            };


            case 'eventolog': {

                await interaction.deferReply({ ephemeral: true });
                await sleep(100);
                function sleep(ms) {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }

                if (db.eventolog) {

                    if (KURATOR_ROLE_ID.some(roleID => member.roles.cache.has(roleID)) || member.permissions.has(PermissionFlagsBits.Administrator)) {
                        return interaction.editReply({ ephemeral: true, embeds: [eventologEmbed], components: [new ActionRowBuilder().setComponents(eventologAnketaBtn, closeRequestEventologBtn)] });
                    };

                    return interaction.editReply({ ephemeral: true, embeds: [eventologEmbed], components: [new ActionRowBuilder().setComponents(eventologAnketaBtn)] })
                };

                if (KURATOR_ROLE_ID.some(roleID => member.roles.cache.has(roleID)) || member.permissions.has(PermissionFlagsBits.Administrator)) {

                    return interaction.editReply({ ephemeral: true, embeds: [eventologEmbed], components: [new ActionRowBuilder().setComponents(eventologAnketaBtn, openRequestEventologBtn)] });
                }

                return interaction.editReply({ content: `Сервер пока не нуждается в ивентологах`, ephemeral: true });

            };

        };

    },
};