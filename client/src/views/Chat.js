import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import socket from '../socket';

export default function Chat() {
    const { userId } = useParams();

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        function load() {
            //emit('getMessage,from useId)
            socket.emit('getMessages', userId);

            socket.on('getMessages', (data) => {
                setMessages(data)
            })
        }
        load();
    }, []);

    return <div className="h-full w-full">

        <div className="w-full">
            {messages.map((message, index) => {

                return <div
                    className={`bg-blue-300 block mt-3 m-2 p-3 rounded-lg w-3/5 ` + `${message.owner ? 'float-right' : 'float-left'}`}
                    key={index}>

                    <div>{message.body.text}</div>
                    <div>{message.body.time}</div>

                </div>
            })}
        </div>
        <div className="bottom-0 w-full fixed">
            <form>

                <input
                    className="w-10/12 p-3 mx-3 rounded-lg "
                    type="text" />

                <button className=" w-1/12 text-blue-300 px-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>

            </form>
        </div>
    </div>
}