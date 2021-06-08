import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import cookies from 'js-cookie';

export default function Settings() {
    const token = cookies.get('token');
    const [user, setUser] = useState({});
    const [contacts, setContacts] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchUserInfo() {
            const res = await fetch(`${process.env.REACT_APP_API}/api/users/settings/profile`, {
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

                //store contacts array in state variable if not null
                if (data.success.data.contacts) {
                    setContacts(data.success.data.contacts);

                }
            }
        }

        async function fetchUserPosts() {
            const res = await fetch(`${process.env.REACT_APP_API}/api/users/settings/posts`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            });

            const data = await res.json();
            // if (data.error) {
            //     alert(data.error);
            // }

            if (data.success) {
                setPosts(data.success.data);

            }
        }

        fetchUserInfo();

        fetchUserPosts();
    }, [token]);

    return <div
        className="w-96 m-auto text-lg">
        <img
            className="w-4/5 m-auto pt-2 pb-4 rounded-full"
            src={user.profilePicture || `${process.env.REACT_APP_API}/images/defaultIcon.png`} alt='userImage' />

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
                className="p-2 inline-block">Gender:</span>
            <span
                className="p-2 bg-gray-100 px-5">{window.genders[user.gender]}</span>
        </div>

        <div
            className="">
            <span
                className="p-2 inline-block">Email:</span>
            <span
                className="p-2 bg-gray-100 px-5">{user.email}</span>
        </div>

        {/* contacts */}
        {contacts.map((contact, index) => (
            <div
                key={index}
                className="">
                {/* display contacts with value added to them */}
                {contact.value && <div>
                    <span
                        className="p-2 inline-block">{contact.app}:</span>
                    <span
                        className="p-2 bg-gray-100 px-5">{contact.value}</span>
                </div>
                }

            </div>
        ))}
        <center>
            <Link to='/settings/edit'>
                <button
                    className="w-11/12 bg-blue-400 p-3 mt-5 text-white px-10">
                    Edit profile</button>
            </Link>
        </center>

        {/* Posts */}
        <h1>Posts</h1>
        <div
            id="posts"
            className="w-full grid grid-cols-3 gap-1">

            {posts.map((post, index) => {
                /* 
                 * display only image posts :)
                 * Todo: show preview of text posts
                 */
                if (post.type) {
                    return <div
                        key={index}
                        className="">
                        <Link to={'/posts/' + post.id}>
                            <img
                                className="w-full"
                                src={`${process.env.REACT_APP_API}/images/` + post.attachments[0]} alt='' />
                        </Link>
                    </div>
                } else {
                    return ''
                }

            })}

        </div>
    </div>
}