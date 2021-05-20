import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Verify() {
    const history = useHistory();

    const [id, setId] = useState('');
    const [name, setName] = useState('');

    const [error, setError] = useState('')

    function handleChangeId(event) {
        setId(event.target.value);
    }

    function handleChangeName(event) {
        setName(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (id.length !== 0 && name.length !== 0) {
            const res = await fetch('http://localhost:5000/users/signup/verify', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id,
                    name: name
                })
            });

            const data = await res.json();

            //if no user account is found or wrong data inserted
            if (data.error) {
                alert(data.error);
            }

            //account already activated 
            if (data.exists) {
                alert(data.exists);
                window.location.replace('/');
            }

            //success
            if (data.success) {
                history.push(`/signup/verify/${data.success.id}`);
            }

        } else {
            setError("Please fill in all the inputs!");
        }
    }
    return <div>
        <form
            onSubmit={handleSubmit}
            className="w-4/5 m-auto p-3 pt-32">
            <h4 className="flex text-3xl justify-center mb-3">Welcome</h4>

            <input
                onChange={handleChangeId}
                className="w-full p-3 border-solid border-grey-300 border-2 mb-4"
                type="text"
                placeholder="ID number"
                required />

            <input
                onChange={handleChangeName}
                className="w-full p-3 border-solid border-grey-300 border-2 mb-4"
                type="text"
                placeholder="Enter your name"
                required />

            <span className="">{error}</span>

            <button className="w-full p-3 border-solid border-grey-300 border-2 bg-red-400 text-white">Signup</button>
        </form>
    </div>
}