import { useContext, useEffect } from "react";
import { FooterContext } from "../context/FooterContext";
import socket from "../socket";

export default function Listener() {
    const { setNewFeed, setNewStatus } = useContext(FooterContext);

    useEffect(() => {
        socket.once('newFeed', () => {
            setNewFeed(true);
        })

        socket.once('newStatus', () => {
            setNewStatus(true);
        })

        return () => {
            socket.off('newFeed');
            socket.off('newStatus');
        }
    }, []);



    return null;
}