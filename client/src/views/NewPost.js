import React from 'react';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';

export default function NewPost() {
    const token = Cookies.get('token');

    const [images, setImages] = useState(null)
    const description = useRef('');

    const history = useHistory();


    const submitForm = async (event) => {
        event.preventDefault();

        if (description.current.value !== '' || images) {
            const body = new FormData();

            const text = description.current.value;

            for (const key of Object.keys(images)) {
                body.append('media', images[key])
            }

            body.append('text', text);

            const res = await fetch(`${process.env.REACT_APP_API}/api/posts/create`, {
                method: 'post',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                body: body
            })

            const data = await res.json();

            if (data.error) {
                alert(data.error)
            }
            if (data.success) {
                history.push('/')
            }
        } else {
            alert("Enter images or text to create Post!")
        }

    }
    return <div className="h-full">
        <form
            className="p-3"
            onSubmit={submitForm}>

            <input
                className="p-3"
                onChange={(event) => { setImages(event.target.files) }}
                type="file"
                multiple />

            <label
                className="p-3">Description</label>
            <br />
            <input
                className="p-3 text-black"
                type="text"
                placeholder="say something"
                ref={description} />
            <br />

            <button
                className="bg-blue-300 p-3 w-4/5"
                type="submit">Post</button>
        </form>
    </div>
}