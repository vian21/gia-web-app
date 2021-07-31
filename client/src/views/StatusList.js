import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Cookies from 'js-cookie';

import { FooterContext } from "../context/FooterContext";


import socket from '../socket';

export default function StatusList() {

    const token = Cookies.get('token');

    const [users, setUsers] = useState([]);

    const { setNewStatus } = useContext(FooterContext)


    useEffect(async () => {

        socket.emit('getStatuses');
        socket.on('getStatuses', (data) => {
            if (data.error) {
                alert(data.error);

            } else {
                setUsers(data);
                setNewStatus(false);
            }

        })

        return () => {
            socket.off('getStatuses')
        }
    }, []);

    return <div className="h-5/6 overflow-scroll w-full">
        <h1
            className="dark:text-white p-3 text-2xl "
        >Status</h1>

        {(() => {
            if (users.length === 0) {
                return <p
                    className="">No Status updates</p>
            } else {
                return <div className="h-full w-full">
                    {
                        users.map((user, index) => {
                            return <Link to={`/status/` + index} key={index}>
                                <div
                                    className="flex mb-5"
                                    key={index}>
                                    {/* image */}
                                    <div
                                        className="w-2/12 mx-3">
                                        <img
                                            className="w-full"
                                            src={`${process.env.REACT_APP_API}/media/${user.userImage || `defaultIcon.png`}`}
                                            alt='userImage'
                                        />
                                    </div>

                                    {/* userName */}
                                    <div
                                        className="m-auto w-10/12">{user.userName}</div>
                                </div>
                            </Link>
                        })
                    }
                </div>
            }
        })()}
    </div>

}