module.exports = (client) => {
    client.antiCrush = async () => {
        console.log(`💥 Anti crush system is ready.`)

        process.on('unhandledRejection', error => {
            console.error(error)
        });

        process.on('uncaughtException', error => {
            console.error(error)
        });

        client.on("error", (error) => {
            console.error(error)
        })
    }
}