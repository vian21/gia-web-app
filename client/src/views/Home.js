import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import Post from '../components/Post';
import Comments from '../components/Comments';

export default function Home() {
    const token = Cookies.get('token');

    const [feed, setFeed] = useState([]);

    let offSet = 0;

    async function getFeed(offSet = 0) {
        const res = await fetch(`${process.env.REACT_APP_API}/api/feed`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                offSet: offSet
            })
        });

        const data = await res.json();

        if (data.error) {
            alert(data.error)
        }

        if (data.data.length !== 0) {
            setFeed(data.data)
        } else {

        }

    }

    useEffect(() => {
        getFeed();
    }, [])
    return <div>
        {feed && feed.map((post, index) => {
            return (<div key={index}>
                <Post postId={post.id} />
            </div>)
        })}
    </div>
}