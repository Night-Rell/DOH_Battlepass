const { EmbedBuilder, Guild, PermissionFlagsBits, Embed, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, Client, Message } = require('discord.js');
const { prefix, GUILD_ID } = require('../../config.json');


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
        if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === "dm") return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        const messageArray = message.content.split(" ");
        const argument = messageArray.slice(1);
        const cmd = messageArray[0];

        if (command === 'nabors') {
            const e = new EmbedBuilder()
            .setTitle('Настройка набора')
            .setDescription('> используйте панели ниже для настройки')

            const menu = new StringSelectMenuBuilder()
            .setCustomId('choose-roles')
            .setPlaceholder('Выберите роль для набора')
            .setOptions(
                new StringSelectMenuOptionBuilder()
                .setLabel(`Добавить новую роль`)
                .setValue('add-role')
            )



            const naborsmessage = await message.channel.send({ embeds: [e], components: [new ActionRowBuilder().setComponents(menu)]})
                        

        }
    }
}