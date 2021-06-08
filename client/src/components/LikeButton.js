import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function LikeButton({ post }) {
    const token = Cookies.get('token');

    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        setLikes(post.likes);

        if (post.selfLike) {
            setLiked(true)
        }
    }, [post.likes, post.selfLike]);

    const sendRequest = async (action) => {
        const res = await fetch(`${process.env.REACT_APP_API}/api/posts/${post.id}/${action}`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })

        const data = await res.json();

        if (data.error) {
            return false
        }

        if (data.success) {
            return true
        }
    }

    const likeHandler = async (event) => {
        event.preventDefault();
        if (liked) {

            if (sendRequest('unlike')) {
                setLikes(likes - 1);
                setLiked(false);
            }
        } else {
            if (sendRequest('like')) {
                setLikes(likes + 1);
                setLiked(true);
            }
        }
    }

    return <div
        className="w-1/3 bg-gray-200 flex p-3"
        onClick={likeHandler}>
        <span className="mr-1">{likes}</span>

        <svg className="w-6 h-6" fill={liked ? 'red' : 'white'} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
    </div>
}