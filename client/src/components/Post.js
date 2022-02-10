import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

import Cookies from 'js-cookie';
import ReactPlayer from 'react-player'

import LikeButton from '../components/LikeButton';

//swiper
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";


// import Swiper core and required modules
import SwiperCore, {
    Pagination
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination]);



export default function Post({ postId }) {
    const id = postId;

    const token = Cookies.get('token');

    const history = useHistory();

    const [post, setPost] = useState({});

    const [menu, setMenu] = useState(false);

    const loginError = "Please Login!";

    //fetch post data
    useEffect(() => {
        const getPost = async () => {
            const res = await fetch(`${process.env.REACT_APP_API}/api/posts/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            const data = await res.json()

            if (data.error) {
                alert(data.error);
            }
            if (data.success) {
                setPost(data.success.data);

            }
        }

        getPost();
    }, [id, token]);

    //delete, save menu
    function menuHandler(event) {
        event.preventDefault();

        if (token) {
            if (menu) {
                setMenu(false)
            } else {
                setMenu(true)
            }
        } else {
            alert(loginError);
        }

    }

    async function deletePost() {
        if (token && post.owner) {

            if (window.confirm("Are you sure you want to delete post?")) {
                const res = await fetch(`${process.env.REACT_APP_API}/api/posts/${id}/delete`, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })

                const data = await res.json();

                if (data.error) {
                    alert(data.error)
                }

                if (data.success) {
                    alert("Post deleted!");
                    history.push('/');

                }
            }
        } else {
            alert(loginError)
        }

    }
    return <div className=''>
        {/* info bar */}
        <div
            className="bg-white dark:bg-gray-900 flex w-full ">
                
            <Link to={`/users/${post.user}`}>
                <div className="w-1/5 float-left p-3">

                    <img className="object-cover w-full rounded-full"
                        src={`${process.env.REACT_APP_API}/media/${post.userImage || `defaultIcon.png`}`}
                        alt="User pic"
                        loading="lazy" />

                </div>

                <div className="w-4/5 p-3 m-auto">
                    <div>{post.userName}</div>
                    <div>{post.location}</div>
                </div>
            </Link>

            {/* post dropdown menu */}
            <div
                onClick={menuHandler}
                className="flex w-6 mr-1 items-center justify-items-center">

                {/* icon */}
                <div>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                </div>

            </div>

        </div>

        {/* dropdown menu content */}
        <div
            className={"w-2/5 bg-white dark:bg-gray-900 z-40 right-0 absolute " + `${menu ? 'block' : 'hidden'}`}>
            <ul>
                <li
                    className=" p-3 border-b-2 block">Save</li>
                {post.owner && <li
                    onClick={deletePost}
                    className=" p-3 border-b-2 block">Delete</li>
                }
            </ul>
        </div>

        {/* Post content */}
        {(() => {

            return <Swiper
                pagination={true}
                className="w-full">

                {/** check if there are media attached to the file */}
                {post.attachments ? post.attachments.map((attachment, index) => {
                    if (attachment.type === 'image') {
                        return < SwiperSlide
                            className="w-full bg-gray-300"
                            key={index} >
                            <img
                                className="h-96 object-contain w-full m-auto"
                                src={process.env.REACT_APP_API + '/media/' + attachment.url}
                                alt='Post img'
                                loading="lazy" />
                            {/* {attachment.text?<div>{attachment.text}</div>:null} */}
                        </SwiperSlide>
                    }

                    //videos
                    if (attachment.type === 'video') {
                        return < SwiperSlide
                            className="w-full bg-gray-300"
                            key={index} >
                            <ReactPlayer
                                autoPlay
                                className="w-full m-auto"
                                controls
                                height={window.innerWidth}
                                loop
                                pip={true}
                                url={process.env.REACT_APP_API + '/media/' + attachment.url}
                            />

                        </SwiperSlide>
                    }

                    // //Text post
                    // if (!post.attachments) {
                    //     return <SwiperSlide
                    //         key={index}>
                    //         <div
                    //             className="m-auto p-3"
                    //         >{attachment.text}</div>
                    //     </SwiperSlide>
                    // }

                }) : null}


            </Swiper>

        })()}

        {/**
           * Text only posts
           */}
        {(() => {
            {/**
               * first check if the data of the post has been fetched. It is initially empty
               * post.attachemnets is initially undefined
               * After the data has been fetched check is there are 0 attachments to confirm its is a text post 
               * */}
            if (post && post.attachments == undefined || post.attachments.length == 0) {

                return <div className='p-3 w-full'>
                    <p className='break-words whitespace-pre-line'>{post.text}</p>
                </div>
            }

        })()}


        {/* Action bar */}
        <div
            className="bg-white dark:bg-gray-900 mb-3 w-full flex">
            {/* likes */}
            <LikeButton post={post} />

            {/* comments button */}
            <div className="w-1/3 p-3">
                <svg className="w-6 h-6 m-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
            </div>

            {/* share button */}
            <div className="w-1/3 p-3 text-right">
                <svg className="w-6 h-6 mr-4 float-right" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>
            </div>
        </div>


    </div>;
}