import { useState } from 'react';
import { useParams } from 'react-router-dom';

import cookies from 'js-cookie';
import validator from 'validator';

export default function Verify() {
    const { id } = useParams();
    const { code } = useParams();

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleChangePassword(event) {
        setPassword(event.target.value);

        if (validator.isStrongPassword(password, {
            minLength: 7,
            minLowercase: 0,
            minUppercase: 0,
            minNumbers: 0,
            minSymbols: 0
        })) {
            setError('');
        } else {
            setError('Enter a password 8 characters long!');
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const res = await fetch(`${process.env.REACT_APP_API}/api/users/signup/set-password`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                code: code,
                password: password
            })
        })
        const data = await res.json();

        if (data.error) {
            alert(data.error);
        }
        if (data.success) {
            if (data.success.token) {
                if (cookies.set('token', data.success.token, {
                    expires: 365,
                    path: '/',
                    secure: false
                })) {
                    window.location.replace("/")
                }
            }
        }

    }
    return <div>
        <form
            onSubmit={handleSubmit}
            className="w-4/5 m-auto p-3 pt-32">
            <h4 className="flex text-3xl justify-center mb-3">Set your password</h4>

            <input
                onChange={handleChangePassword}
                className="w-full p-3 border-solid border-grey-300 border-2 mb-4"
                type="password"
                placeholder="Enter password"
                required />

            <span className="">{error}</span>

            <button className="w-full p-3 border-solid border-grey-300 border-2 bg-blue-400 text-white">Verify</button>
        </form>
    </div>
}