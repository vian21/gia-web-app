const { conversations, searchConversation } = require('./conversations');

const { getMessages, saveMessage } = require('./messages');

const { getUserImage, getUserName } = require('../../helpers/functions/users/select');


const chats = async (socket, io) => {
    let room;
    let otherUser;

    socket.on('conversations', async () => {
        const chts = await conversations(socket.userId);

        socket.emit('conversations', chts);
    })

    socket.on('searchConversation', async (data) => {
        const results = await searchConversation(data, socket.userId);

        socket.emit('searchConversation', results);
    })

    socket.on('joinChat', async (otherUserId) => {

        room = generateRoom(socket.userId, otherUserId);
        otherUser = otherUserId;

        socket.leave(room);

        socket.join(room);

        // send chat info to user
        const chatInfo = {
            room,
            myId: socket.userId,
            userName: await getUserName(otherUser),
            userImage: await getUserImage(otherUser)
        }
        socket.emit('joinChat', chatInfo);


    })

    //leaving a room, this will prevent from seing chats from other rooms when you are out
    socket.on('leave', () => {
        socket.leave(room);
    })

    //listen for message requests
    socket.on('getMessages', async (userId) => {
        const messages = await getMessages(socket.userId, userId);

        socket.emit('getMessages', messages);
    })

    socket.on('sendMessage', (message) => {

        const date = new Date()

        const time = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();

        const sender = socket.userId;
        const receiver = otherUser;
        const body = {
            text: message,
            time: time,
        }

        const messageObj = {
            sender: sender,
            receiver: otherUser,
            body: body,
        }

        io.to(room).emit('getMessages', messageObj);

        //save message in database
        saveMessage(sender, receiver, JSON.stringify(body), time);
    })

}

/**
 * Function to generate unique room ids for each users
 * @param userIds
 * @returns a concatenated string with the less userId first and the greatest last
 * (1,3) => 13
 * (3,1) => 13
 * (22,1) =>122
 */
const generateRoom = (user1, user2) => {
    if (user1 < user2) {
        return user1.toString() + user2.toString();
    } else {
        return user2.toString() + user1.toString();
    }
}

module.exports = {
    chats
}