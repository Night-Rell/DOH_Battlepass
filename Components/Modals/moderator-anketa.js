const { ModalSubmitInteraction, EmbedBuilder } = require('discord.js');
const { MODERATOR_REQUEST_CHANNEL_ID, MODERATOR_ROLE_ID } = require('../../config.json');

module.exports = {
    id: 'moderatorAnketaModal',
    /**
     * 
     * @param {ModalSubmitInteraction} interaction 
     */

    async execute(interaction, client) {

        const { fields, member, guild } = interaction;

        const about = fields.getTextInputValue(`moderatorAnketaModalTextInputAbout`);
        const time = fields.getTextInputValue(`moderatorAnketaModalTextInputTime`);
        const rules = fields.getTextInputValue(`moderatorAnketaModalTextInputRules`);
        const work = fields.getTextInputValue(`moderatorAnketaModalTextInputWork`);
        const why = fields.getTextInputValue(`moderatorAnketaModalTextInputWhy`);

        const color = guild.roles.cache.get(MODERATOR_ROLE_ID).color

        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle('Заявка на должность модератора')
            .setDescription(`${member} - ${member.id}`)
            .setThumbnail(member.displayAvatarURL({ forceStatic: true }))
            .setFields(
                { name: `О себе`, value: `\`\`\`${about}\`\`\``, },
                { name: `Часовой пояс`, value: `\`\`\`${time}\`\`\`` },
                { name: `Ознакомлен с правилами`, value: `\`\`\`${rules}\`\`\`` },
                { name: `Опыт работы`, value: `\`\`\`${work}\`\`\`` },
                { name: `Почему имено этот участник`, value: `\`\`\`${why}\`\`\`` },
            )
            .setTimestamp()

        interaction.reply({ content: `**Ваша анкета отправлена, ожидайте результатов**`, ephemeral: true });

        const message = await guild.channels.cache.get(MODERATOR_REQUEST_CHANNEL_ID).send({ embeds: [embed] });

        message.react('✅').then(() => message.react('❌'));

        const filter = (reaction, user) => ['✅', '❌'].includes(reaction.emoji.name) && user.id !== client.user.id

        message.awaitReactions({ filter, max: 1, time: 1000 * 60 * 60 * 24 })
            .then(async collected => {
                const reaction = collected.first();

                let executor;
                const users = reaction.users.cache.filter(user => user.id !== client.user.id);
                users.map(user => executor = user.username);

                if (reaction.emoji.name === '✅') {
                    message.reactions.removeAll();
                    member.roles.add(MODERATOR_ROLE_ID);
                    member.roles.add("982956540657020929");

                    embed.setColor('Green')
                    embed.setFooter({ text: `Заявку одобрил ${executor}` });

                    await message.edit({ embeds: [embed] });

                    try {
                        await member.send({ content: `Ваша заявка на сервере ${guild.name} на должность модератора одобрена.` })
                    } catch { }//ничего делать не нужно
                };


                if (reaction.emoji.name === '❌') {
                    message.reactions.removeAll()

                    embed.setColor('Red')
                    embed.setFooter({ text: `Заявку отклонил ${executor}` });

                    await message.edit({ embeds: [embed] });

                    try {
                        await member.send({ content: `❌ Ваша заявка на сервере ${guild.name} на должность модератора отклонена.` });
                    } catch { }//ничего делать не нужно
                }


            })
    },
};
