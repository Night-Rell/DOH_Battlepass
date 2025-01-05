const { EmbedBuilder, Guild, PermissionFlagsBits, Embed, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, Client, Message } = require('discord.js');
const { prefix, GUILD_ID, UNOB_ROLE_ID, NOTIICATION_CHANNEL_ID } = require('../../config.json');

const battlepassDB = require('../../Shemas/battlepass');


module.exports = {
    name: 'messageCreate'
    ,
    /**
     * 
     * @param {Message} message
     * @param {Client} client 
     * @returns 
     */
    async execute(message, client) {
        if (message.author.bot || message.channel.type === "dm") return;

        
        let notifyChannel = message.guild.channels.cache.get(NOTIICATION_CHANNEL_ID);

    
        let user_bp = await battlepassDB.findOne({ userId: message.author.id });


        let notifyEmbed = new EmbedBuilder()
            .setAuthor({ name: `Оповещения ${message.guild.name}`, iconURL: message.guild.iconURL({ forceStatic: false }) })
            .setTitle('Поздравляем!')

        if (!user_bp) {
            //Создаем профиль бд если его нет
            battlepassDB.create({
                userId: message.author.id
            })
        }

        user_bp.messageCount += 1
        await user_bp.save();

        if (user_bp.has_goldpass) {
            notifyEmbed.setColor('Gold')
        } else {
            notifyEmbed.setColor('Blurple')
        }


        if (user_bp.messageCount === 500) {
            
            user_bp.level = 1;
            
            user_bp.to_levelUp = 1000;
            await user_bp.save();

            if (user_bp.has_goldpass) {
               
                notifyEmbed.setDescription(`🎉🎉 ${message.author} получил ${user_bp.level} уровень пасса. 🎉🎉\n\n *Награда*: **X3 Lucky Stone Mask (GOLDPASS)** и **Lucky Stone Mask**`)
                notifyEmbed.setThumbnail('https://cdn.discordapp.com/attachments/1220411099887833088/1324865834723704978/latest.png?ex=6779b4f5&is=67786375&hm=1ee69971006b3c68c54ae3ad0d761233f38ece23c49a50b8d8f03a0516e8462c&')

            } else {

                notifyEmbed.setDescription(`🎉🎉 ${message.author} получил ${user_bp.level} уровень пасса. 🎉🎉\n\n *Награда*: **Lucky Stone Mask**`)
                notifyEmbed.setThumbnail('https://cdn.discordapp.com/attachments/1220411099887833088/1324865834723704978/latest.png?ex=6779b4f5&is=67786375&hm=1ee69971006b3c68c54ae3ad0d761233f38ece23c49a50b8d8f03a0516e8462c&')
            }


            await notifyChannel.send({ content: `${message.author}` ,embeds: [notifyEmbed] })
        }

        else if (user_bp.messageCount === 1000) {
            
            user_bp.level = 2
            
            user_bp.to_levelUp = 2000;
            await user_bp.save();

            if (user_bp.has_goldpass) {
               
                notifyEmbed.setDescription(`🎉🎉 ${message.author} получил ${user_bp.level} уровень пасса. 🎉🎉\n\n *Награда*: **Lucky Arrow (GOLDPASS)** и **Lucky Arrow**`)
                notifyEmbed.setThumbnail('https://cdn.discordapp.com/attachments/1220411099887833088/1324866635286446121/latest.png?ex=6779b5b4&is=67786434&hm=1940128c0e604d00e973ba0850b52a8ec0871725de2e98573d4f89ddef14000f&')

            } else {

                notifyEmbed.setDescription(`🎉🎉 ${message.author} получил ${user_bp.level} уровень пасса. 🎉🎉\n\n *Награда*: **Lucky Arrow**`)
                notifyEmbed.setThumbnail('https://cdn.discordapp.com/attachments/1220411099887833088/1324866635286446121/latest.png?ex=6779b5b4&is=67786434&hm=1940128c0e604d00e973ba0850b52a8ec0871725de2e98573d4f89ddef14000f&')
            }


            await notifyChannel.send({ content: `${message.author}` ,embeds: [notifyEmbed] })
        }

        else if (user_bp.messageCount === 2000) {
            
            user_bp.level = 3
            
            user_bp.to_levelUp = 3000;
            await user_bp.save();

            if (user_bp.has_goldpass) {
               
                notifyEmbed.setDescription(`🎉🎉 ${message.author} получил ${user_bp.level} уровень пасса. 🎉🎉\n\n *Награда*: **X2 Lucky Arrow (GOLDPASS)** и <@&${UNOB_ROLE_ID}>`)
                notifyEmbed.setThumbnail('https://media.discordapp.net/attachments/1220411099887833088/1324867331570012243/be239b2d1ab687228c2d57d379ad0573.png?ex=6779b65a&is=677864da&hm=5530e92f81e3dc3451f7d06f1fb83d826955df832487a6435fe8c3cbf65f98fd&=&format=webp&quality=lossless&width=301&height=350')

            } else {

                notifyEmbed.setDescription(`🎉🎉 ${message.author} получил ${user_bp.level} уровень пасса. 🎉🎉\n\n *Награда*: <@&${UNOB_ROLE_ID}>`)
                notifyEmbed.setThumbnail('https://media.discordapp.net/attachments/1220411099887833088/1324867331570012243/be239b2d1ab687228c2d57d379ad0573.png?ex=6779b65a&is=677864da&hm=5530e92f81e3dc3451f7d06f1fb83d826955df832487a6435fe8c3cbf65f98fd&=&format=webp&quality=lossless&width=301&height=350')
            }


            await message.member.roles.add(UNOB_ROLE_ID);

            await notifyChannel.send({ content: `${message.author}` ,embeds: [notifyEmbed] })
        }

        else if (user_bp.messageCount === 3000) {
            
            user_bp.level = 4
            
            user_bp.to_levelUp = 5000;
            await user_bp.save();
            
            if (user_bp.has_goldpass) {
               
                notifyEmbed.setDescription(`🎉🎉 ${message.author} получил ${user_bp.level} уровень пасса. 🎉🎉\n\n *Награда*: **+50 уровней (GOLDPASS)** и **Lucky Arrow**`)
                notifyEmbed.setThumbnail('https://media.discordapp.net/attachments/1220411099887833088/1324868310701179004/89797C51258645604035C60540FC8D37875D335A.png?ex=6779b744&is=677865c4&hm=a4cf45dfce3796f684d425f1adbd35fb170b97c4f3637bb83349fef97d1af23b&=&format=webp&quality=lossless&width=466&height=350')

            } else {

                notifyEmbed.setDescription(`🎉🎉 ${message.author} получил ${user_bp.level} уровень пасса. 🎉🎉\n\n *Награда*: **Lucky Arrow**`)
                notifyEmbed.setThumbnail('https://media.discordapp.net/attachments/1220411099887833088/1324866635286446121/latest.png?ex=6779b5b4&is=67786434&hm=1940128c0e604d00e973ba0850b52a8ec0871725de2e98573d4f89ddef14000f&=&format=webp&quality=lossless')
            }


            await notifyChannel.send({ content: `${message.author}` ,embeds: [notifyEmbed] })
        }

        else if (user_bp.messageCount === 5000) {
            
            user_bp.level = 5
            await user_bp.save();

            const goldRandom = Math.floor(Math.random() * 100) + 1;
            const freeRandom = Math.floor(Math.random() * 100) + 1;

            if (user_bp.has_goldpass) {

                if (goldRandom <= 50) {

                    notifyEmbed.setDescription(`🎉🎉 ${message.author} получил ${user_bp.level} уровень пасса. 🎉🎉\n\n *Награда*: **Devil Moon S+ (15%)**`)
                    notifyEmbed.setThumbnail('https://cdn.discordapp.com/attachments/1220411099887833088/1324836115718602793/s-l500.png?ex=67799948&is=677847c8&hm=ce5f9bf6dce5dc74149d49a8aaa1575f2d0b7088e20e535cda65e5357a119666&')
                }
                else if (goldRandom <= 75) {
 
                    notifyEmbed.setDescription(`🎉🎉 ${message.author} получил ${user_bp.level} уровень пасса. 🎉🎉\n\n *Награда*: **Blade of Exicle S+ (8%)**`)
                    notifyEmbed.setThumbnail('https://cdn.discordapp.com/attachments/1220411099887833088/1324836225563230219/i.png?ex=67799962&is=677847e2&hm=6622d43dbea97e10dbc8a010808d322aa23d22b6e1f5a0e8c5579ea62447f46e&')
                }
                else if (goldRandom <= 90) {

                    notifyEmbed.setDescription(`🎉🎉 ${message.author} получил ${user_bp.level} уровень пасса. 🎉🎉\n\n *Награда*: **Festive The World S+ (5%)**`)
                    notifyEmbed.setThumbnail('https://cdn.discordapp.com/attachments/1220411099887833088/1324836352029626478/755.png?ex=67799980&is=67784800&hm=45d6538dac6ee3dc717902c0ff1bfa64bf87bb515e4f09f1f40e183bac4ff108&')
                }
                else if (goldRandom <= 99) {

                    notifyEmbed.setDescription(`🎉🎉 ${message.author} получил ${user_bp.level} уровень пасса. 🎉🎉\n\n *Награда*: **Tyrant King Crimson S+ (5%)**`)
                    notifyEmbed.setThumbnail('https://cdn.discordapp.com/attachments/1220411099887833088/1324836453666127973/755.png?ex=67799998&is=67784818&hm=63dc51c5ffe758c587ab918f32b1d258d015ed925c600c244291d7e115637e43&')
                }
                else {

                    notifyEmbed.setDescription(`🎉🎉 ${message.author} получил ${user_bp.level} уровень пасса. 🎉🎉\n\n *Награда*: **Dark Determination Tusk  S+ (3%)**`)
                    notifyEmbed.setThumbnail('https://cdn.discordapp.com/attachments/1220411099887833088/1324836652341792849/s-l500.png?ex=677999c8&is=67784848&hm=93409fa8c321bd5e8b9e6b14f141835e85c9d79e3da66879f91f837f5d2e5358&')
                }
            } else {

                if (freeRandom <= 40) {

                    notifyEmbed.setDescription(`🎉🎉 ${message.author} получил ${user_bp.level} уровень пасса. 🎉🎉\n\n *Награда*: **Bible GE A+ (5%)**`)
                    notifyEmbed.setThumbnail('https://cdn.discordapp.com/attachments/1220411099887833088/1324835975821656114/5466752b-2113-4303-9755-d9ca77dacab7.png?ex=67799926&is=677847a6&hm=eea85f3a4aa20afcc03ececdd98353b8d08d0c7cd45eaa313e913cd483e7d475&')
                }
                else if (freeRandom <= 65) {
 
                    notifyEmbed.setDescription(`🎉🎉 ${message.author} получил ${user_bp.level} уровень пасса. 🎉🎉\n\n *Награда*: **Boros GER A+ (10%)**`)
                    notifyEmbed.setThumbnail('https://cdn.discordapp.com/attachments/1220411099887833088/1324835402158309528/755.png?ex=6779989e&is=6778471e&hm=bb99fa41deac109aeeefe63babee8402ff7158a9f3932de3a989fec29f7724a1&')
                }
                else if (freeRandom <= 80) {

                    notifyEmbed.setDescription(`🎉🎉 ${message.author} получил ${user_bp.level} уровень пасса. 🎉🎉\n\n *Награда*: **Luffy Star Platinum A+ (8%)**`)
                    notifyEmbed.setThumbnail('https://cdn.discordapp.com/attachments/1220411099887833088/1324835596035948694/2wpTLszW6J4.png?ex=677998cc&is=6778474c&hm=034af694d018e06c871a12da4c019df77278ee948b698be70f2e466dfa191065&')
                }
                else if (freeRandom <= 19) {

                    notifyEmbed.setDescription(`🎉🎉 ${message.author} получил ${user_bp.level} уровень пасса. 🎉🎉\n\n *Награда*: **KCR Deimos  A+ (3%)**`)
                    notifyEmbed.setThumbnail('https://cdn.discordapp.com/attachments/1220411099887833088/1324835704970412064/755.png?ex=677998e6&is=67784766&hm=2ffc77b5f6144e6e6d7bc2daeea37aada800f2f4bb76db463bc4cc2dbd70d4c9&')
                }
                else {

                    notifyEmbed.setDescription(`🎉🎉 ${message.author} получил ${user_bp.level} уровень пасса. 🎉🎉\n\n *Награда*: **Crazy Idol  A+ (4%)**`)
                    notifyEmbed.setThumbnail('https://cdn.discordapp.com/attachments/1220411099887833088/1324835853419151370/dCqjOoZXkLU.png?ex=67799909&is=67784789&hm=bdbfeb25b6c1adc9c045de33b8ad991f80a4c0af436a7adc4e0abf7ed320a469&')
                }
            }


            
            await notifyChannel.send({ content: `${message.author}` , embeds: [notifyEmbed] })
        }
                    
    }
}
