import { useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';

export default function Verify() {
    const { id } = useParams();
    const history = useHistory();

    const code = useRef('');

    async function handleSubmit(event) {
        event.preventDefault();

        const res = await fetch(`${process.env.REACT_APP_API}/api/users/signup/verify-code`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                code: code.current.value
            })
        });
        const data = await res.json();

        if (data.error) {
            alert(data.error);
        }

        if (data.success) {
            history.push(`/signup/set-password/${data.success.id}/${data.success.code}`);
        }

    }
    return <div>
        <form
            onSubmit={handleSubmit}
            className="w-4/5 m-auto p-3 pt-32">

            <h4 className="flex text-3xl justify-center mb-3">✅Verify your account</h4>

            <p>Enter the 4-digits code that was be sent to your email.</p>

            <br />

            <input
                ref={code}
                className="w-full p-3 border-solid border-grey-300 border-2 mb-4"
                type="text"
                placeholder="Code"
                required />

            <button className="w-full p-3 border-solid border-grey-300 border-2 bg-blue-400 text-white">Verify</button>
        </form>
    </div>
}