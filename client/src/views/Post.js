import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import Cookies from 'js-cookie';

import LikeButton from '../components/LikeButton';
import Comments from '../components/Comments';

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



export default function Post() {
    const { id } = useParams();
    const token = Cookies.get('token');

    const [post, setPost] = useState({});


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

    return <div>
        {/* info bar */}
        <div
            className="w-full flex">
            <div className="w-1/5 float-left p-3">
                <img className="w-full rounded-full"
                    src={post.userImage || process.env.REACT_APP_API + '/images/defaultIcon.png'}
                    alt="User pic"
                    loading="lazy" />
            </div>

            <div className="w-4/5 p-3 m-auto">
                <div>{post.userName}</div>
                <div>{post.location}</div>
            </div>

            <div className="flex w-6 mr-1 overflow-auto items-center justify-items-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
            </div>
        </div>

        {/* Post content */}
        {(() => {
            //Image
            if (post.type) {
                return <Swiper
                    pagination={true}
                    className="w-full">
                    {post.attachments.map((attachment, index) => {

                        return < SwiperSlide
                            className="w-full bg-gray-300"
                            key={index} >
                            <img
                                className="w-full m-auto"
                                src={process.env.REACT_APP_API + '/images/' + attachment}
                                height={window.innerWidth}
                                alt='Post img'
                                loading="lazy" />
                        </SwiperSlide>
                    })}

                </Swiper>
            }
            //Text post
            else {
                return <div>{post.text}</div>
            }
        })()}


        {/* action bar */}
        <div
            className="w-full bg-gray-200 flex">
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

        {/* text of post (for image post which also have captio) */}
        <div>
            {(() => {
                if (post.type) {
                    return <div>{post.text}</div>
                }

            })()}
        </div>

        {/* comments section */}
        <Comments post={id} />

    </div >;
}