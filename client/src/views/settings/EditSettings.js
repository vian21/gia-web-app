import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import cookies from 'js-cookie';

export default function Settings() {
    const token = cookies.get('token');
    const history = useHistory();

    const [user, setUser] = useState({});
    const [contacts, setContacts] = useState([]);

    const [imageError, setImageError] = useState('');
    const [idError, setIdError] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [DOBError, setDOBError] = useState('');
    const [genderError, setGenderError] = useState('');


    //fetch user info on load
    useEffect(() => {
        async function fetchData() {
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

        fetchData();
    }, [token]);

    //general update function
    const sendUpdate = async (url, body) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: body
        });
        const data = await res.json();

        if (data.error) {
            alert(data.error);
            return false;
        }
        if (data.success) {
            return true;
        }
    }

    //update profile picture
    const updateProfilePicture = async (event) => {
        if (event.target.files[0] !== '') {
            const body = new FormData();
            body.append('media', event.target.files[0]);
            body.append('oldImage', user.profilePicture);

            const res = await fetch(`${process.env.REACT_APP_API}/api/users/update/profilePicture`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                body: body,
            })

            const data = await res.json();

            if (data.error) {
                setImageError("Failed to save image!");

                setTimeout(() => {
                    setNameError('');
                }, 1500)
            } else {
                document.getElementById('profile').src = `${process.env.REACT_APP_API}/media/${data.success}`;

                //update user's state
                let temp = user;
                temp.profilePicture = data.success;

                setUser(temp);

            }
        }

    }

    //idNumber
    const updateId = (event) => {
        const data = JSON.stringify({
            idNumber: event.target.value
        });

        if (sendUpdate(`${process.env.REACT_APP_API}/api/users/update/idNumber`, data)) {
            setIdError('saved');

            setTimeout(() => {
                setIdError('');
            }, 1500)
        }
    }

    //name
    const updateName = (event) => {
        const data = JSON.stringify({
            name: event.target.value
        });

        if (sendUpdate(`${process.env.REACT_APP_API}/api/users/update/name`, data)) {
            setNameError('saved');

            setTimeout(() => {
                setNameError('');
            }, 1500)

        }
    }

    //email
    const updateEmail = (event) => {
        const data = JSON.stringify({
            email: event.target.value
        });

        if (sendUpdate(`${process.env.REACT_APP_API}/api/users/update/email`, data)) {
            setEmailError('saved');

            setTimeout(() => {
                setEmailError('');
            }, 1500)
        }
    }

    //Date Of Birth (DOB)
    const updateDOB = (event) => {
        const data = JSON.stringify({
            DOB: event.target.value
        });

        if (sendUpdate(`${process.env.REACT_APP_API}/api/users/update/DOB`, data)) {
            setDOBError('saved');

            setTimeout(() => {
                setDOBError('');
            }, 1500)
        }
    }

    const updateGender = (event) => {
        const data = JSON.stringify({
            gender: event.target.value
        });

        if (sendUpdate(`${process.env.REACT_APP_API}/api/users/update/gender`, data)) {
            setGenderError('saved');

            setTimeout(() => {
                setGenderError('');
            }, 1500)
        }
    }

    const updateContact = (event, index) => {
        const data = JSON.stringify({
            index: index,
            value: event.target.value
        });

        if (sendUpdate(`${process.env.REACT_APP_API}/api/users/update/contact`, data)) {
            setDOBError('saved');

            setTimeout(() => {
                setDOBError('');
            }, 1500)
        }
    }

    const deleteAccount = async (event) => {
        event.preventDefault();

        if (window.confirm("Are you sure your want to delete your account?")) {
            const res = await fetch(`${process.env.REACT_APP_API}/api/users/delete`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            });

            const data = await res.json();

            if (data.error) {
                alert("Failed to delete your account!");
            }

            if (data.success) {
                alert("Account deleted! We are sad to see you leave!");
                history.push('/logout');
            }
        }

    }

    //render function
    return <div
        className="w-96 m-auto text-lg">

        <img
            className="w-4/5 m-auto pt-2 pb-4"
            id="profile"
            src={`${process.env.REACT_APP_API}/media/${user.profilePicture || `defaultIcon.png`}`}
            alt='userImage' />

        <input type="file" onChange={updateProfilePicture} />
        {imageError}
        <div
            className="">
            <span
                className="p-2 inline-block">ID number:</span>
            <input
                className="p-2 bg-gray-100 px-5 dark:text-black"
                defaultValue={user.idNumber}
                onBlur={updateId}
            />

            {idError}
        </div>

        <div
            className="">
            <span
                className="p-2 inline-block">Name:</span>
            <input
                className="p-2 bg-gray-100 px-5 dark:text-black"
                defaultValue={user.name}
                onBlur={updateName}
            />
            {nameError}
        </div>

        <div
            className="">
            <span
                className="p-2 inline-block">DOB:</span>
            <input
                className="p-2 bg-gray-100 px-5 dark:text-black"
                type="date"
                defaultValue={user.DOB}
                onBlur={updateDOB}
            />
            {DOBError}
        </div>

        <div
            className="">
            <span
                className="p-2 inline-block">Gender:</span>
            <select
                onChange={updateGender}
                value={user.gender}
                className="dark:text-black p-3">
                {/* <option value={user.gender}>{window.genders[user.gender]}</option> */}
                {window.genders.map((gender, index) => (
                    <option key={index} value={index}>{gender}</option>
                ))}
            </select>
            {genderError}
        </div>

        <div
            className="">
            <span
                className="p-2 inline-block">Email:</span>
            <input
                className="p-2 bg-gray-100 px-5 dark:text-black"
                defaultValue={user.email}
                onBlur={updateEmail}
            />

            {emailError}
        </div>

        {contacts.map((contact, index) => (
            <div
                key={index}
                className="">
                <span
                    className="p-2 inline-block">{contact.app}:</span>
                <input
                    className="p-2 bg-gray-100 px-5 dark:text-black"
                    defaultValue={contact.value}
                    onBlur={(e) => updateContact(e, index)}
                />
            </div>
        ))}

        <br />

        <center>
            <Link to='/logout'><button
                className="w-5/6 text-white p-3 bg-green-300 mb-4">Logout</button>
            </Link>

            <button
                onClick={deleteAccount}
                className="w-5/6 text-white p-3 bg-red-300">Delete Account!</button>
        </center>

    </div>
}