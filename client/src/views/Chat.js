import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import socket from '../socket';

import Message from "../components/chat/Message";

export default function Chat() {
    const { userId } = useParams();

    const [chatInfo, setChatInfo] = useState({})
    const [messages, setMessages] = useState([]);

    const message = useRef('');
    const messagesEnd = useRef('');

    useEffect(() => {

        socket.emit('joinChat', userId);

        //fetch chat users info
        socket.once('joinChat', (data) => {
            setChatInfo(data);
        })

        //emit('getMessage,from useId)
        socket.emit('getMessages', userId);

        return () => {
            socket.off('joinChat');
            socket.emit('leave');
        }
    }, [])

    socket.once('getMessages', (data) => {
        //store previouslly fetched data in temporal variable
        let temp = messages;

        //push new messsage to array
        temp = temp.concat(data);
        //update the messages state
        setMessages(temp);
        // scrollToBottom();
    })

    const sendMessage = (event) => {
        event.preventDefault();
        const messageText = message.current.value;

        if (messageText.length !== 0) {

            socket.emit('sendMessage', messageText);

            //reset message form
            message.current.value = '';
        }
    }
    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    };

    return <div className="h-full w-full">
        {/* NavBar */}
        <div
            className="w-full flex">
            <div className="w-1/5 float-left p-3">
                <img className="w-full rounded-full"
                    src={`${process.env.REACT_APP_API}/media/${chatInfo.userImage || `defaultIcon.png`}`}
                    alt="User pic"
                    loading="lazy" />
            </div>

            <div className="w-4/5 p-3 m-auto">
                <div>{chatInfo.userName}</div>
                <div>{chatInfo.location}</div>
            </div>

            {/* post dropdown menu */}
            {/* <div
                onClick={menuHandler}
                className="flex w-6 mr-1 items-center justify-items-center"> */}

            {/* icon */}
            {/* <div>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                </div>

            </div> */}

        </div>

        {/* dropdown menu content */}
        {/* <div
            className={"w-2/5 bg-white dark:bg-gray-900 z-40 right-0 absolute " + `${menu ? 'block' : 'hidden'}`}>
            <ul>
                <li
                    className=" p-3 border-b-2 block">Save</li>
                {post.owner && <li
                    onClick={deletePost}
                    className=" p-3 border-b-2 block">Delete</li>
                }
            </ul>
        </div> */}

        {/* messages container */}
        <div
            id="messageContainer"
            className="h-4/5 overflow-scroll w-full">
            {messages && messages.map((message, index) => {

                return <Message key={index} message={message} userId={chatInfo.myId} />
            })}
        </div>
        <div ref={messagesEnd} />
        {/* message form */}
        <div className="bottom-0 mt-12 w-full fixed">
            <form onSubmit={sendMessage}>

                <input
                    ref={message}
                    className="w-10/12 p-3 mx-3 rounded-lg text-black"
                    type="text" />

                <button className=" w-1/12 text-blue-300 px-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>

            </form>
        </div>
    </div>
}