const conversations = require('./conversations');

const { getMessages } = require('./messages');

const { getUserImage, getUserName } = require('../../helpers/functions/users/select');


const chats = async (socket, io) => {
    let room;
    let otherUser;
    socket.on('conversations', async () => {
        const chts = await conversations(socket.userId);

        socket.emit('conversations', chts);
    })

    socket.on('joinChat', async (otherUser) => {
        room = generateRoom(socket.userId, otherUser);
        otherUser = otherUser;
        socket.leave(room);

        socket.join(room);

        // send chat info to user
        const chatInfo = {
            room,
            userName: await getUserName(otherUser),
            userImage: await getUserImage(otherUser)
        }
        socket.emit('joinChat', chatInfo);


    })

    //listen for message requests
    socket.on('getMessages', async (userId) => {
        console.log("here back", userId)
        const messages = await getMessages(socket.userId, userId);

        socket.emit('getMessages', messages)

    })

    socket.on('sendMessage', (message) => {

        const date = new Date()

        const time = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();

        const messageObj = {
            sender: socket.userId,
            receiver: otherUser,
            body: {
                text: message,
                time: time,
            }
        }

        io.to(room).emit('getMessages', messageObj)
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