const fs = require('fs');

module.exports = async (client) => {
    client.handleButtons = async () => {

        const buttonFolders = fs.readdirSync('./Components/Buttons');
        for (const folder of buttonFolders) {
            const buttonFile = fs
                .readdirSync(`./Components/Buttons`)
                .filter((file) => file.endsWith('.js'));

            const { buttons } = client;

            for (const file of buttonFile) {
                const button = require(`../../Components/Buttons/${file}`);
                if (!button.id) return
                buttons.set(button.id, button);
            }

        }
    }
}