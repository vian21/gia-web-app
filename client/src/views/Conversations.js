import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import socket from "../socket";

export default function Conversations() {
    const [conversations, setConversations] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        //send  a fetch conversations request
        socket.emit("conversations");

        //listen for a reply
        socket.on("conversations", (data) => {
            if (conversations.length !== data.length) {
                setConversations(data);
            }
        });
        return () => {
            socket.off("conversations");
        };
    }, []);

    const searchHandler = (event) => {
        event.preventDefault();
        // setSearch(event.target.value);  //useState is behind
        const search = event.target.value;

        socket.emit("searchConversation", search)
    }

    socket.on('searchConversation', (data) => {
        if (data !== false) {
            setConversations(data);

        } else {
            setConversations([])
        }
    })
    return (
        <div>
            <h1 className="text-4xl p-3">Chats</h1>

            {/* Chat search form */}
            <center>
                <form
                    className="m-auto my-4 w-full">
                    <input
                        className="p-1 text-black rounded-lg w-11/12"
                        onChange={searchHandler}
                        placeholder="Search"
                        type="text" />
                </form>
            </center>

            {(() => {
                if (conversations.length === 0) {
                    return <p className="p-3">No conversations</p>;
                } else {
                    return (
                        <div>
                            {conversations.map((chat, index) => {
                                return (
                                    <Link to={`/chat/` + chat.userId} key={index}>
                                        <div className="flex mb-5" key={index}>
                                            {/* image */}
                                            <div className="w-2/12 mx-3">
                                                <img
                                                    className="w-full"
                                                    src={
                                                        chat.userImage ||
                                                        `${process.env.REACT_APP_API}/images/defaultIcon.png`
                                                    }
                                                    alt="userImage"
                                                />
                                            </div>

                                            {/* userName */}
                                            <div className="m-auto w-10/12">{chat.user}</div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    );
                }
            })()}
        </div>
    );
}
