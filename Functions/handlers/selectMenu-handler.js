const fs = require('fs');

module.exports = async (client) => {
    client.handleSelectMenus = async () => {

        const selectMenuFolders = fs.readdirSync('./Components/Select menus');
        for (const folder of selectMenuFolders) {
            const selectMenuFile = fs
                .readdirSync(`./Components/Select menus`)
                .filter((file) => file.endsWith('.js'))

            const { selectMenus } = client;

            for (const file of selectMenuFile) {
                const selectMenu = require(`../../Components/Select menus/${file}`);
                if (!selectMenu.id) return

                selectMenus.set(selectMenu.id, selectMenu)
            }
        }
    }
}