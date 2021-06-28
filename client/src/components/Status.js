import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

import Cookies from 'js-cookie';


//swiper
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"


// import Swiper core and required modules
import SwiperCore, {
  Navigation
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Navigation]);


export default function Status({ statusId }) {
    const id = statusId;
    const token = Cookies.get('token');

    const history = useHistory();

    const [status, setStatus] = useState({});

    const [menu, setMenu] = useState(false);

    const loginError = "Please Login!";

    //fetch status data
    useEffect(() => {
        const getStatus = async () => {
            const res = await fetch(`${process.env.REACT_APP_API}/api/status/${id}`, {
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
                setStatus(data.success.data);

            }
        }

        getStatus();
    }, [id, token]);

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

    /**
     * Delete status
     */
    async function deleteStatus() {
        if (token && status.owner) {

            if (window.confirm("Are you sure you want to delete Status?")) {
                const res = await fetch(`${process.env.REACT_APP_API}/api/status/${id}/delete`, {
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
                    alert("Status deleted!");
                    history.push('/');

                }
            }
        } else {
            alert(loginError)
        }

    }


    return <div className="h-full w-full relative text-white">
        {/* info bar */}
        <div
            className="w-full flex z-50 absolute">
            <div className="w-1/5 float-left p-3">
                <img className="w-full rounded-full"
                    src={status.userImage || process.env.REACT_APP_API + '/images/defaultIcon.png'}
                    alt="User pic"
                    loading="lazy" />
            </div>

            <div className="w-4/5 p-3 m-auto">
                <div>{status.userName}</div>
                <div>{status.location}</div>
            </div>

            {/* status dropdown menu */}
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
            className={"w-2/5 bg-gray-700 z-40 top-20 right-2 rounded-xl absolute text-white " + `${menu ? 'block' : 'hidden'}`}>
            <ul>
                <li
                    className=" p-3 border-b-2 block overflow-hidden">Save</li>
                {status.owner && <li
                    onClick={deleteStatus}
                    className=" p-3 border-b-2 block overflow-hidden">Delete</li>
                }
            </ul>
        </div>

        {/* Status content */}
        {(() => {
            //Image
            if (status.type) {
                return <Swiper
                    navigation={true}
                    allowTouchMove={false}
                    className="w-full h-full z-10">
                    {status.attachments.map((attachment, index) => {

                        return < SwiperSlide
                            className="w-full h-full bg-gray-900"
                            key={index} >
                            <img
                                className="w-full h-full object-contain"
                                src={process.env.REACT_APP_API + '/images/' + attachment.image}
                                alt='Status img'
                                loading="lazy" />
                            <center>
                                <div className="absolute bottom-10 text-white text-xl w-full">{attachment.text}</div>
                            </center>
                        </SwiperSlide>
                    })}

                </Swiper>
            }
            //Text status
            else {
                return <div
                    className="w-full h-full bg-gray-900 text-white text-2xl"
                >
                    <center>
                        <div className="pt-60 px-5">{status.text}</div>
                        </center>
                </div>
            }
        })()}


<style jsx>
   {`
   .swiper-button-prev,.swiper-button-next{
       width:50%;
       height:100%;
       opacity:0;
    z-index:50;
   }`}
</style>
        {/* text of status (for image status which also have caption) */}
        {/* <div className="bottom-10 absolute text-white z-50 text-xl  w-full">
            <center>
                {(() => {
                    if (status.type) {
                        return <div>{status.text}</div>
                    }

                })()}
            </center>
        </div> */}

    </div >;
}