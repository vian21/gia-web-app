import { useState } from 'react';
import { Link } from 'react-router-dom';

import cookies from 'js-cookie';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');


    function handleChangeEmail(event) {
        //set email in state
        setEmail(event.target.value)
    }

    function handleChangePassword(event) {
        //set password in state
        setPassword(event.target.value)
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (email && password) {
            const res = await fetch(`${process.env.REACT_APP_API}/api/users/login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const data = await res.json();

            if (data.error) {
                setError(data.error);

            }

            if (data.token) {
                if (cookies.set('token', data.token, {
                    expires: 365,
                    path: '/',
                    secure: false
                })) {
                    window.location.replace("/");
                }


            }

        } else {
            alert("Please Fill in the data")
        }
    }
    return <div>
        <form
            onSubmit={handleSubmit}
            className="w-4/5 m-auto p-3 pt-40 dark:text-black">
            <h4 className="flex text-3xl justify-center mb-3 dark:text-white">Login</h4>
            <input
                onChange={handleChangeEmail}
                className="w-full p-3 border-solid border-grey-300 border-2 mb-4"
                type="text"
                placeholder="Enter your email or Id number"
                required />
            {/* <span className="">{emailError}</span> */}

            <input
                onChange={handleChangePassword}
                className="w-full p-3 border-solid border-grey-300 border-2 mb-4"
                type="password"
                placeholder="Enter your password"
                required />

            <span className="">{error}</span>

            <button
                className="w-full p-3 border-solid border-grey-300 border-2 bg-blue-400 text-white mb-4">Login</button>
            <Link to='/signup'>
                <button className="w-full p-3 border-solid border-grey-300 border-2 bg-red-400 text-white">Signup</button>
            </Link>
        </form>
    </div>
}