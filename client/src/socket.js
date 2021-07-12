import socketClient from 'socket.io-client';

import Cookies from 'js-cookie';

const token = Cookies.get('token') || '';
const socket = socketClient(process.env.REACT_APP_API, {
    auth: {
        token: token,
    }
});

export default socket;