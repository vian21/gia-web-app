const conversations = require('./conversations');

const { getMessages } = require('./messages');


const chats = async (socket) => {

    socket.on('conversations', async () => {
        const chts = await conversations(socket.user);

        socket.emit('conversations', chts);
    })

    socket.on('getMessages', async (userId) => {
        const messages = await getMessages(socket.user, userId);

        socket.emit('getMessages', messages)

    })
}

module.exports = {
    chats
}