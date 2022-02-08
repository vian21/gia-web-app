import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import cookies from 'js-cookie';

export default function UserProfile() {
    const token = cookies.get('token');
    const [user, setUser] = useState({});
    const [contacts, setContacts] = useState([])
    const [posts, setPosts] = useState([]);

    const {userId} = useParams();

    useEffect(() => {
        async function fetchUserInfo() {
            const res = await fetch(`${process.env.REACT_APP_API}/api/users/${userId}`, {
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
            const res = await fetch(`${process.env.REACT_APP_API}/api/users/${userId}/posts`, {
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
        className="h-full m-auto overflow-x-scroll text-lg w-full">
        <img
            className="w-4/5 m-auto pt-2 pb-4 rounded-full"
            src={`${process.env.REACT_APP_API}/media/${user.profilePicture || `defaultIcon.png`}`} alt='userImage' />
  
        <div
            className="">
            <span
                className="p-2 inline-block">ID number:</span>
            <span
                className="p-2 px-5 dark:text-white">{user.idNumber}</span>
        </div>

        <div
            className="">
            <span
                className="p-2 inline-block">Name:</span>
            <span
                className="p-2 px-5">{user.name}</span>
        </div>

        <div
            className="">
            <span
                className="p-2 inline-block">DOB:</span>
            <span
                className="p-2 px-5 dark:text-white">{user.DOB}</span>
        </div>

        <div
            className="">
            <span
                className="p-2 inline-block">Gender:</span>
            <span
                className="p-2 px-5 dark:text-white">{window.genders[user.gender]}</span>
        </div>

        <div
            className="">
            <span
                className="p-2 inline-block">Email:</span>
            <span
                className="p-2 px-5 dark:text-white">{user.email}</span>
        </div>

        {/* contacts */}
        {contacts.map((contact, index) => (
            <div
                key={index}
            >
                {/* display contacts with value added to them */}
                {contact.value && <div>
                    <span
                        className="p-2 inline-block">{contact.app}:</span>
                    <span
                        className="p-2 px-5 dark:text-white">{contact.value}</span>
                </div>
                }

            </div>
        ))}


        {/* Posts */}
        <h1 className="text-2xl text-black dark:text-white">Posts</h1>
        <div
            id="posts"
            className="w-full grid grid-cols-3 gap-1">

            {posts.map((post, index) => {
                /* 
                 * display only image posts :)
                 * Todo: show preview of text posts
                 */
                if (post.attachments.length !== 0) {
                    if (post.attachments[0].type === 'image') {
                        return <div
                            key={index}
                            className="">
                            <Link to={'/posts/' + post.id}>
                                <img
                                    className="w-full"
                                    src={`${process.env.REACT_APP_API}/media/` + post.attachments[0].url} alt='' />
                            </Link>
                        </div>
                    } else {
                        return ''
                    }
                }

            })}

        </div>
    </div>
}