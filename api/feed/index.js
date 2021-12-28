const { db } = require('../../helpers/db');

const feed = async (socket, io) => {
    const getFeed = async (offSet = 0) => {
        const [result] = await db.execute('SELECT id FROM posts ORDER BY id DESC LIMIT ?,20', [offSet])
            .catch(console.log);

        return result;
    }

    socket.on('feed', async (offSet = 0) => {
        const userId = socket.userId;

        const feed = await getFeed(offSet);

        socket.emit('feed', feed);
    })

}

module.exports = feed;