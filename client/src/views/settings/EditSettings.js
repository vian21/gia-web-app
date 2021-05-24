import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import cookies from 'js-cookie';

export default function Settings() {
    const token = cookies.get('token');
    const [user, setUser] = useState({});
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:5000/users/settings/profile`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            });

            const data = await res.json();
            if (data.error) {
                alert(data.error);
            }

            if (data.success) {
                setUser(data.success.data);

                //store contacts array in state variable
                setContacts(data.success.data.contacts);
            }
        }

        fetchData();
    }, [token]);

    return <div
        className="w-96 m-auto text-lg">
        <img
            className="w-4/5 m-auto pt-2 pb-4"
            src={user.profilePicture || 'http://localhost:5000/images/defaultIcon.png'} alt='userImage' />

        <div
            className="">
            <span
                className="p-2 inline-block">ID number:</span>
            <span
                className="p-2 bg-gray-100 px-5">{user.idNumber}</span>
        </div>

        <div
            className="">
            <span
                className="p-2 inline-block">Name:</span>
            <span
                className="p-2 bg-gray-100 px-5">{user.name}</span>
        </div>

        <div
            className="">
            <span
                className="p-2 inline-block">DOB:</span>
            <span
                className="p-2 bg-gray-100 px-5">{user.DOB}</span>
        </div>

        <div
            className="">
            <span
                className="p-2 inline-block">Email:</span>
            <span
                className="p-2 bg-gray-100 px-5">{user.email}</span>
        </div>

        {contacts.map((contact, index) => (
            <div
                key={index}
                className="">
                <span
                    className="p-2 inline-block">{contact.app}:</span>
                <span
                    className="p-2 bg-gray-100 px-5">{contact.name}</span>
            </div>
        ))}
        <center>
            <Link to='/settings/edit'>
                <button
                    className="w-11/12 bg-blue-400 p-3 mt-5 text-white px-10">
                    Edit profile</button>
            </Link>
        </center>

    </div>
}