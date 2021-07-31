const { db, listener, MySQLEvents } = require('../../helpers/db');

const feed = async (socket, io) => {
    const getFeed = async (offSet = 0) => {
        const [result] = await db.execute('SELECT id FROM posts LIMIT ?,20', [offSet])
            .catch(console.log);

        return result;
    }

    // await listener.start();

    // listener.addTrigger({
    //     name: 'Feed',
    //     expression: 'app.posts.*',
    //     statement: MySQLEvents.STATEMENTS.ALL,
    //     onEvent: (event) => { // You will receive the events here
    //         console.log(event)
    //         socket.emit('newFeed')
    //     },
    // });

    socket.on('feed', async (offSet = 0) => {
        const userId = socket.userId;

        const feed = await getFeed(offSet);

        socket.emit('feed', feed);
    })

}

module.exports = feed;