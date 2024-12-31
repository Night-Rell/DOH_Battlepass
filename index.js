require('dotenv').config();
const { Client, GatewayIntentBits, Collection, PermissionFlagsBits, ChannelType, Events } = require('discord.js');
const fs = require('fs');



const client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        32767
    ]
});

client.commands = new Collection();
client.commandArray = [];


client.buttons = new Collection();
client.modals = new Collection();
client.selectMenus = new Collection();

const functionFolders = fs.readdirSync('./Functions');
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./Functions/${folder}/`)
        .filter((file) => file.endsWith('.js'));
    for (const file of functionFiles) {
        require(`./Functions/${folder}/${file}`)(client);
    };
};

client.login(process.env.TOKEN).then(async () => {

    await client.mongooseConnect();
    await client.handleEvents();
    await client.handleCommands();
    await client.handleButtons();
    await client.handleModals();
    await client.handleSelectMenus();
    await client.antiCrush();

})