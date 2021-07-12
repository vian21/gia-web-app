import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import Cookies from 'js-cookie';

import Status from '../components/Status';

//swiper
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/effect-cube/effect-cube.min.css"


// import Swiper core and required modules
import SwiperCore, {
    Autoplay, EffectCube
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Autoplay, EffectCube]);

export default function StatusView() {
    const { index } = useParams();
    // const history = useHistory();

    const token = Cookies.get('token');

    const [users, setUsers] = useState([]);

    useEffect(async () => {

        getStatuses();
    }, [token]);

    const getStatuses = async () => {
        const res = await fetch(`${process.env.REACT_APP_API}/api/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })

        const data = await res.json();

        if (data.error) {
            alert(data.error)
        }
        if (data.success.data) {
            setUsers(data.success.data)
        }
    }

    return <div className="h-full">
        <Swiper
            autoplay={{
                "delay": 6000,
                "disableOnInteraction": false,
                "stopOnLastSlide": true
            }}
            effect={'cube'}
            grabCursor={true}
            initialSlide={index}
            className="h-full">
            {users.map((user, index) => {
                return <SwiperSlide className="h-full" key={index}>
                    <Swiper
                        className="h-full">
                        {
                            user.status.map((status, index) => {
                                return <SwiperSlide className="h-full" key={index}>
                                    <Status statusId={status.id} />
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                </SwiperSlide>
            })}
        </Swiper>
    </div >
}