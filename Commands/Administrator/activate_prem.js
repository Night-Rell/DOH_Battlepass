const { SlashCommandBuilder, CommandInteraction, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder,  AttachmentBuilder, StringSelectMenuOptionBuilder, PermissionFlagsBits, } = require('discord.js');

const { generateImage } = require("../../Utils/generate_pass");

const battlepassDB = require('../../Shemas/battlepass');

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
            .setColor('Gold')
            .setTitle('Поздравляем!')
            .setThumbnail(`https://cdn.discordapp.com/attachments/1220411099887833088/1324796232048054362/image.png?ex=67797423&is=677822a3&hm=c8f170b433eb3fb2dd04c52923372a53b4cd61a7ac54e66e8b55a58a6b18ca73&`)
            
            if (user_bp.level === 1) {
                notifyEmbed.setDescription(`⭐⭐ ${interaction.member} активировал вам голдпасс ⭐⭐\n\n *Награда за 1 лвл (GOLDPASS)*: **X3 Lucky Stone Mask**`)
            }

            else if (user_bp.level === 2) {
                notifyEmbed.setDescription(`⭐⭐ ${interaction.member} активировал вам голдпасс ⭐⭐\n\n *Награда за 2 и 1 лвл (GOLDPASS)*: **X3 Lucky Stone Mask** и **Lucky Arrow**`)
            }

            else if (user_bp.level === 3) {
                notifyEmbed.setDescription(`⭐⭐ ${interaction.member} активировал вам голдпасс ⭐⭐\n\n *Награда за 3, 2 и 1 лвл (GOLDPASS)*:\n**X3 Lucky Stone Mask**\n**LuckyArrow**\n**X2 Lucky Arrow**`)
            }

            else if (user_bp.level === 4) {
                notifyEmbed.setDescription(`⭐⭐ ${interaction.member} активировал вам голдпасс ⭐⭐\n\n *Награда за 4, 3, 2 и 1 лвл (GOLDPASS)*:\n**X3 Lucky Stone Mask**\n**LuckyArrow**\n**X2 Lucky Arrow**\n**+50 уровней**`)
            }

            else if (user_bp.level === 5) {

                const goldRandom = Math.floor(Math.random() * 100) + 1;

                if (goldRandom <= 50) {
                    notifyEmbed.setDescription(`⭐⭐ ${interaction.member} активировал вам голдпасс ⭐⭐\n\n *Награда за 5, 4, 3, 2 и 1 лвл*:\n**X3 Lucky Stone Mask**\n**LuckyArrow**\n**X2 Lucky Arrow** \n**+50 уровней**\n**Devil Moon S+ (15%)**`)
                    notifyEmbed.setThumbnail('https://cdn.discordapp.com/attachments/1220411099887833088/1324836115718602793/s-l500.png?ex=67799948&is=677847c8&hm=ce5f9bf6dce5dc74149d49a8aaa1575f2d0b7088e20e535cda65e5357a119666&')
                }
                else if (goldRandom <= 75) {
    
                    notifyEmbed.setDescription(`⭐⭐ ${interaction.member} активировал вам голдпасс ⭐⭐\n\n *Награда за 5, 4, 3, 2 и 1 лвл*:\n**X3 Lucky Stone Mask**\n**LuckyArrow**\n**X2 Lucky Arrow** \n**+50 уровней**\n**Blade of Excile S+ (8%)**`)
                    notifyEmbed.setThumbnail('https://cdn.discordapp.com/attachments/1220411099887833088/1324836225563230219/i.png?ex=67799962&is=677847e2&hm=6622d43dbea97e10dbc8a010808d322aa23d22b6e1f5a0e8c5579ea62447f46e&')
                }
                else if (goldRandom <= 90) {

                    notifyEmbed.setDescription(`⭐⭐ ${interaction.member} активировал вам голдпасс ⭐⭐\n\n *Награда за 5, 4, 3, 2 и 1 лвл*:\n**X3 Lucky Stone Mask**\n**LuckyArrow**\n**X2 Lucky Arrow** \n**+50 уровней**\n**Festive The World S+ (5%)**`)
                    notifyEmbed.setThumbnail('https://cdn.discordapp.com/attachments/1220411099887833088/1324836352029626478/755.png?ex=67799980&is=67784800&hm=45d6538dac6ee3dc717902c0ff1bfa64bf87bb515e4f09f1f40e183bac4ff108&')
                }
                else if (goldRandom <= 99) {

                    notifyEmbed.setDescription(`⭐⭐ ${interaction.member} активировал вам голдпасс ⭐⭐\n\n *Награда за 5, 4, 3, 2 и 1 лвл*:\n**X3 Lucky Stone Mask**\n**LuckyArrow**\n**X2 Lucky Arrow** \n**+50 уровней**\n**Tyrant King Crimson S+ (5%)**`)
                    notifyEmbed.setThumbnail('https://cdn.discordapp.com/attachments/1220411099887833088/1324836453666127973/755.png?ex=67799998&is=67784818&hm=63dc51c5ffe758c587ab918f32b1d258d015ed925c600c244291d7e115637e43&')
                }
                else {

                    notifyEmbed.setDescription(`⭐⭐ ${interaction.member} активировал вам голдпасс ⭐⭐\n\n *Награда за 5, 4, 3, 2 и 1 лвл*:\n**X3 Lucky Stone Mask**\n**LuckyArrow**\n**X2 Lucky Arrow** \n**+50 уровней**\n**Dark Determination Tusk  S+ (3%)**`)
                    notifyEmbed.setThumbnail('https://cdn.discordapp.com/attachments/1220411099887833088/1324836652341792849/s-l500.png?ex=677999c8&is=67784848&hm=93409fa8c321bd5e8b9e6b14f141835e85c9d79e3da66879f91f837f5d2e5358&')
                }


            await notifyChannel.send({ content: `${target}`, embeds: [notifyEmbed]  });
            await interaction.reply({ content: `Голдпасс для ${target} активирован`});



        } else {
            interaction.reply({ content: 'У участника уже есть голдпасс'});
        }


    }
    },
}