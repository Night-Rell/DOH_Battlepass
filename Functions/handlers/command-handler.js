const fs = require('fs');
const { REST, Routes } = require('discord.js')
const { GUILD_ID, CLIENT_ID } = require('../../config.json');

module.exports = async (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('./Commands');

        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./Commands/${folder}`)
                .filter((file) => file.endsWith(".js"));

            const { commands, commandArray } = client;

            for (const file of commandFiles) {
                const command = require(`../../Commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
            };
        };

        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

        try {

            console.log(`🟡 Starterd refreshing application (/) commands...`);

            const data = await rest.put(Routes.applicationCommands(CLIENT_ID), {

                body: client.commandArray,
            })

            console.log(`🟢 Successfully reloaded ${data.length} application (/) commands.`);

        } catch (err) {
            console.log(err)
        };
    };
};