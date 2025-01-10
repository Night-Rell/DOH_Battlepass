const { SlashCommandBuilder, CommandInteraction, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder,  AttachmentBuilder, StringSelectMenuOptionBuilder, PermissionFlagsBits, ButtonStyle } = require('discord.js');

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

        const { guild, user, } = interaction;

        let user_bp = await battlepassDB.findOne({ userId: user.id })

        if (!user_bp) {
            battlepassDB.create({
                userId: interaction.user.id
            })
        }

        const codeBtn = new ButtonBuilder().setCustomId('use-code').setLabel('Ввести код').setStyle(ButtonStyle.Secondary).setEmoji('<:fastforward:1325503818833727530>')

        const imageBuffer = await generateImage(user.id, user_bp.has_goldpass);
        const attachment = new AttachmentBuilder(imageBuffer, {name: 'image.png'});

        await interaction.reply({
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
            ], files: [attachment], components: [new ActionRowBuilder().setComponents(codeBtn)]
        });

        setTimeout(async () => {
            codeBtn.setDisabled(true);
            
            interaction.editReply({ components: [new ActionRowBuilder().setComponents(codeBtn)] });
        }, 60000);
    },
}