import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import Post from '../components/Post';
import socket from '../socket';

export default function Home() {
    const token = Cookies.get('token');

    const [feed, setFeed] = useState([]);

    useEffect(() => {
        socket.emit('feed');
        return () => {

        }
    }, [])

    socket.on('feed', (data) => {
        if (data.error) {
            alert(data.error)
        }
        else {
            setFeed(data)
        }
    })
    return <div>
        <center>
            <Link to='/posts/create'>
                <div>
                    <button
                        className="bg-blue-300 p-3 w-4/5">New Post</button>
                </div>
            </Link>
        </center>
        {feed && feed.map((post, index) => {
            return <div key={index}>
                <Post postId={post.id} />
            </div>
        })}
    </div>
}