import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import socket from '../socket';

export default function Conversations() {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        function load() {
            //send  a fetch conversations request
            socket.emit('conversations');

            //listen for a reply
            socket.on('conversations', (data) => {
                if (conversations.length !== data.length) {
                    console.log("new")
                    setConversations(data);
                }
            })
        }

        load();
    }, []);

    return <div>
        <h1 className="text-3xl p-3">Chats</h1>
        {conversations.map((chat, index) => {
            return <Link to={`/chat/` + chat.userId} key={index}>
                <div
                    className="flex mb-5"
                    key={index}>
                    {/* image */}
                    <div
                        className="w-2/12 mx-3">
                        <img
                            className="w-full"
                            src={chat.userImage || `${process.env.REACT_APP_API}/images/defaultIcon.png`} alt='userImage'
                        />
                    </div>

                    {/* userName */}
                    <div
                        className="m-auto w-10/12">{chat.user}</div>
                </div>
            </Link>
        })}
    </div>
}