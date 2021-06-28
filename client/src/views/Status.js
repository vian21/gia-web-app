import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Cookies from 'js-cookie';

import Status from '../components/Status';

export default function StatusView() {

    const token = Cookies.get('token');

    const [users, setUsers] = useState([]);

    useEffect(async () => {

        getUsers();
    }, [token]);

    const getUsers = async () => {
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

    return <div className="h-full w-full">
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
                            return <Link to={`/status/` + user.user}>
                                <div
                                    className="flex mb-5"
                                    key={index}>
                                    {/* image */}
                                    <div
                                        className="w-2/12 mx-3">
                                        <img
                                            className="w-full"
                                            src={user.userImage || `${process.env.REACT_APP_API}/images/defaultIcon.png`} alt='userImage'
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