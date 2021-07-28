const db = require('../../helpers/db');

const feed = async (socket, io) => {
    socket.on('feed', async (offSet = 0) => {
        const userId = socket.userId;


        const [result] = await db.execute('SELECT id FROM posts LIMIT ?,20', [offSet])
            .catch(console.log);

        // res.json({
        //     data: result
        // });

        socket.emit('feed', result);
    })

}

module.exports = feed;