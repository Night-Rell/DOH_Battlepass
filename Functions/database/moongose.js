const mongoose = require('mongoose');

module.exports = (client) => {
    client.mongooseConnect = async () => {
        const MONGO = process.env.MONGO

        if (!MONGO) {
            console.log(`❌ mongo url is no added to env file.`);
            process.exit()
        };

        await mongoose.connect(MONGO, {
            //keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,

        }).then(() => {
            console.log(`🟢 Connected to mongo DB`);
        }).catch((err) => {
            console.log(err)
        });

    };
};