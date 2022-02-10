import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import cookies from 'js-cookie';

export default function Settings() {
    const token = cookies.get('token');
    const [user, setUser] = useState({});
    const [contacts, setContacts] = useState([]);
    const [posts, setPosts] = useState([]);

    let theme = 'system';
    if (localStorage.getItem('theme') && localStorage.getItem('theme') === 'dark') {
        theme = 'dark';
    }
    if (localStorage.getItem('theme') && localStorage.getItem('theme') === 'light') {

        theme = 'light';
    }

    useEffect(() => {
        async function fetchUserInfo() {
            const res = await fetch(`${process.env.REACT_APP_API}/api/users/0`, {  // userId is set to 0 becuase the backend will default(change it) to current user ID
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
            const res = await fetch(`${process.env.REACT_APP_API}/api/users/0/posts`, {
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

    function changeTheme(event) {
        event.preventDefault();
        let choice = event.target.value;

        if (choice === 'system') {
            localStorage.removeItem('theme');

            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            }

        } else {
            localStorage.setItem('theme', choice);

            if (choice === 'light') {
                document.documentElement.classList.remove('dark')

            } else {
                document.documentElement.classList.add('dark');

            }
        }

    }
    return <div className="h-full m-auto overflow-x-scroll text-lg w-full">

        <div
            className="h-2/5 w-4/5 m-auto mt-2 mb-4 ">
            <img
                className='h-full object-cover rounded-full w-full'
                src={`${process.env.REACT_APP_API}/media/${user.profilePicture || `defaultIcon.png`}`} alt='userImage' />
        </div>

        {/* dark mode toggler */}
        <div >
            <span>Theme:</span>
            <select
                value={theme}
                onChange={changeTheme}
                className="ml-2 p-2 dark:text-black">
                <option value="light">Light mode</option>
                <option value="dark">Dark mode</option>
                <option value="system">System</option>
            </select>
        </div>
        <div
            className="">
            <span
                className="p-2 inline-block w-1/3">ID number:</span>
            <span
                className="dark:text-white rounded-md w-3/5">{user.idNumber}</span>
        </div>

        <div
            className="">
            <span
                className="p-2 inline-block w-1/3">Name:</span>
            <span
                className=" rounded-md w-3/5">{user.name}</span>
        </div>

        <div
            className="">
            <span
                className="p-2 inline-block w-1/3">DOB:</span>
            <span
                className=" dark:text-white rounded-md w-3/5">{user.DOB}</span>
        </div>

        <div
            className="">
            <span
                className="p-2 inline-block w-1/3">Gender:</span>
            <span
                className="dark:text-white rounded-md w-3/5">{window.genders[user.gender]}</span>
        </div>

        <div
            className="">
            <span
                className="p-2 inline-block w-1/3">Email:</span>
            <span
                className=" dark:text-white overflow-auto rounded-md w-1/5">{user.email}</span>
        </div>

        {/* contacts */}
        {contacts.map((contact, index) => (
            <div
                key={index}
            >
                {/* display contacts with value added to them */}
                {contact.value && <div>
                    <span
                        className="p-2 inline-block w-1/3">{contact.app}:</span>
                    <span
                        className="dark:text-white rounded-md w-3/5">{contact.value}</span>
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
        <h1 className="dark:text-black">Posts</h1>
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