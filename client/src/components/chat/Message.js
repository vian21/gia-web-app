export default function Message({ message, userId }) {
    /**
     * For messages sent over socket.io
     * They are not saved in the database before being sent and don't have message.owner property
     * Le the client determine if the message is send by its current user or another
     */
    if (!message.owner) {
        if (message.sender === userId) {
            message.owner = true;
        } else {
            message.owner = false;
        }

    }
    return <div
        className={`bg-blue-300 block clear-both mt-3 m-2 p-3 rounded-lg w-3/5 ${message.owner ? 'float-right' : 'float-left'}`}
    >

        <div>{message.body.text}</div>
        <div>{message.body.time}</div>

    </div>
}