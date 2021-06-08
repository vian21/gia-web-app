import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import validator from 'validator';

export default function Verify() {
    const { id } = useParams();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    function handleChangeEmail(event) {
        setEmail(event.target.value);

        if (validator.isEmail(email)) {
            setError('');

        } else {
            setError('Please enter a valid email!');
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (email.length !== 0 && error === '') {
            const res = await fetch(`${process.env.REACT_APP_API}/api/users/signup/verify-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id,
                    email: email
                })
            });
            const data = await res.json();

            if (data.error) {
                alert(data.error);
            }

            if (data.success) {
                history.push(`/signup/code/${data.success.id}`);
            }

        } else {
            alert("Enter a valid email!");
        }

    }
    return <div>
        <form
            onSubmit={handleSubmit}
            className="w-4/5 m-auto p-3 pt-32">

            <h4 className="flex text-3xl justify-center mb-3">Email Verification</h4>

            <p>A 4-digits number will be sent to your email.</p>

            <input
                onChange={handleChangeEmail}
                className="w-full p-3 border-solid border-grey-300 border-2 mb-4"
                type="text"
                placeholder="Enter your email"
                required />

            <span className="">{error}</span>

            <button className="w-full p-3 border-solid border-grey-300 border-2 bg-blue-400 text-white">Send Code</button>
        </form>
    </div>
}