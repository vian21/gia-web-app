import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export default function Logout() {
    Cookies.remove('token');
    return <Redirect to='/login' />
}