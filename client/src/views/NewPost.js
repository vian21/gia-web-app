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

        //check if there is at least description or a media file (image/ video)
        if (description.current.value !== '' || images !== null) {
            const body = new FormData();

            const text = description.current.value;

            //if there is mediale ,if it has captured
            console.log(images)
            if (images !== null) {
                for (const key of Object.keys(images)) {
                    body.append('media', images[key])
                }
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
            <p className="p-3 text-2xl text-white">New Post</p>
            <center>
                <input
                    className="p-3"
                    onChange={(event) => { setImages(event.target.files) }}
                    type="file"
                    placeholder="Select Photos"
                    multiple />

            </center>
            <label
                className="p-3 text-lg">Description</label>
            <br />
            <center>
                <div className="w-full">
                    <input
                        className="border-2 h-60 p-3  rounded-md text-black w-11/12 "
                        type="text"
                        placeholder="Write Something"
                        ref={description} />
                </div>
                <br />

                <button
                    className="bg-blue-300 p-3 w-11/12"
                    type="submit">Post</button>
            </center>

        </form>
    </div >
}