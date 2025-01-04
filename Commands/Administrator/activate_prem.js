const { SlashCommandBuilder, CommandInteraction, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder,  AttachmentBuilder, StringSelectMenuOptionBuilder, PermissionFlagsBits, } = require('discord.js');

const { generateImage } = require("../../Utils/generate_pass");

const battlepassDB = require("../../Shemas/battlepass");

const { NOTIICATION_CHANNEL_ID } = require('../../config.json');


module.exports = {
    category: 'administrator',
    data: new SlashCommandBuilder()
        .setName('gold')
        .setDescription('Активировать голд пасс участнику')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option => option.setName('участник').setDescription('какому участнику активировать голдпасс').setRequired(true))
    ,
    /**
     * 
    * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {

        const { guild, user, options } = interaction;

        const target = options.getUser('участник');

        let notifyChannel = guild.channels.cache.get(NOTIICATION_CHANNEL_ID);

        let user_bp = await battlepassDB.findOne({ userId: target.id });


        if (!user_bp.has_goldpass) {

            user_bp.has_goldpass = true;

            await user_bp.save();


            let notifyEmbed = new EmbedBuilder()
            .setAuthor({ name: `Оповещения ${guild.name}`, iconURL: guild.iconURL({ forceStatic: false }) })
            .setColor('Blurple')
            .setTitle('Поздравляем!')
            .setDescription(`⭐⭐ ${interaction.member} активировал вам голдпасс ⭐⭐`)
            .setThumbnail(`https://cdn.discordapp.com/attachments/1220411099887833088/1324796232048054362/image.png?ex=67797423&is=677822a3&hm=c8f170b433eb3fb2dd04c52923372a53b4cd61a7ac54e66e8b55a58a6b18ca73&`)
        
            await notifyChannel.send({ content: `${target}`, embeds: [notifyEmbed]  });
            await interaction.reply({ content: `Голдпасс для ${target} активирован`});

        } else {
            interaction.reply({ content: 'У участника уже есть голдпасс'});
        }



    },
}