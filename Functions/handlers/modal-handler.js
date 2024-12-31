const fs = require('fs');

module.exports = async (client) => {
    client.handleModals = async () => {

        const modalFolders = fs.readdirSync('./Components/Modals');
        for (const folder of modalFolders) {
            const modalFile = fs
                .readdirSync(`./Components/Modals`)
                .filter((file) => file.endsWith('.js'));

            const { modals } = client;

            for (const file of modalFile) {
                const modal = require(`../../Components/Modals/${file}`);
                if (!modal.id) return
                modals.set(modal.id, modal);
            }

        }
    }
}