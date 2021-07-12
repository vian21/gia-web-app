const conversations = require('./conversations');


const chats = async (socket) => {
    const chts = await conversations(1);
    
    socket.emit('conversations', chts)
}

module.exports = {
    chats
}