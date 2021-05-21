import { useEffect, useState } from 'react';
import cookies from 'js-cookie';

export default function Settings() {
    const token = cookies.get('token');
    const [user, setUser] = useState();
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:5000/users/settings/profile`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            });

            const data = await res.json();
            if (data.error) {
                alert(data.error)
            }
            if (data.success) {
                setUser(data.success.info);
            }
        }

        fetchData();
    }, [user]);

    return "settings"
}