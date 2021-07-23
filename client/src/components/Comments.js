import { useEffect, useRef, useState } from 'react';

import Cookies from 'js-cookie';

export default function Comments({ post }) {
    const id = post;
    const token = Cookies.get('token');

    const [comments, setComments] = useState([]);
    const [visibleForm, setVisibleForm] = useState(true);
    const commentText = useRef('');

    const getComments = async () => {
        const res = await fetch(`${process.env.REACT_APP_API}/api/posts/${id}/comments`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        const data = await res.json()

        if (data.success) {
            setComments([])
            setComments(data.success.data.comments);

        }
    }

    useEffect(() => {
        getComments();
    }, []);


    async function comment(event) {
        event.preventDefault();
        if (token) {
            if (commentText.current.value !== '') {
                const res = await fetch(`${process.env.REACT_APP_API}/api/posts/comments/save`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        postId: id,
                        comment: commentText.current.value
                    })

                })

                const data = await res.json();
                if (data.error) {
                    alert(data.error)
                }

                if (data.success) {
                    commentText.current.value = '';
                    getComments();

                    //hide commment field when done
                    // setVisibleForm(false);
                }
            } else {
                alert('Please enter a comment!')
            }
        } else {
            alert("Please Login!");
        }
    }

    return <div className="mb-20">

        {/* comment section */}
        {(() => {
            if (comments.length !== 0) {
                return <div>
                    {
                        comments.map((comment, index) => {
                            return <div
                                key={index}
                                className="w-full flex">

                                {/* user image */}
                                <div className="w-1/12 m-2">
                                    <img className="w-full rounded-full"
                                        src={`${process.env.REACT_APP_API}/media/${comment.userImage || `defaultIcon.png`}`}
                                        alt="User pic"
                                        loading="lazy" />
                                </div>

                                <div className="w-11/12">
                                    {/* user name */}
                                    <div
                                        className="text-lg font-medium">{comment.user}</div>

                                    {/* comment text */}
                                    <div
                                        className="font-base">{comment.comment}</div>
                                </div>
                            </div>
                        })
                    }
                </div>
            } else {
                return <div className="text-lg p-3 mb-3">No comments!</div>
            }
        })()}
        {/* comment form */}
        <div>
            <form
                onSubmit={comment}
                className={"w-full object-bottom bottom-0 fixed mb-10 " + `${visibleForm ? 'block' : 'hidden'}`}>
                <input
                    ref={commentText}
                    type="text"
                    className="p-2 ml-2 w-10/12 border-solid border-2 border-gray-300 rounded-lg dark:text-black" />
                <button className=" w-1/12 text-blue-300 px-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>                </button>
            </form>
        </div>
    </div>
}