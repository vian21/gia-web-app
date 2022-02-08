import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import { FooterContext } from "../context/FooterContext";

import Post from '../components/Post';
import socket from '../socket';

export default function Home({ reload = false }) {

    const token = Cookies.get('token');

    const [feed, setFeed] = useState([]);

    const { setNewFeed } = useContext(FooterContext);
    const { reloadHome } = useContext(FooterContext);

    if (reloadHome) {
        window.location.reload();
    }

    //store id of last post
    let offSet = 0;

    useEffect(async () => {
        socket.emit('feed');

        return () => {

        }
    }, [])



    socket.once('feed', (data) => {
        if (data.error) {
            alert(data.error);
        }

        else {

            if (data.length !== 0) {
                /**
                 * If it is first feed load, the offset will be 0
                 */
                if (offSet === 0) {
                    setFeed(data);

                    // //store id of last post
                    // offSet = data[0].id;

                }
                // else {
                //     let temp = feed;

                //     temp.unshift(data);

                // }

                // offSet = data[0].id || 0;       //taking the first element because they are served in descending order. The last post is first
                // console.log(offSet)
                setNewFeed(false);
            }

        }
    })

    // socket.once('newFeed', () => {
    //     console.log("new",offSet)
    //     // socket.emit('feed', offSet);
    //     // console.log("here")
    // })

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