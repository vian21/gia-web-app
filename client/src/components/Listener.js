import { useContext } from "react";
import { FooterContext } from "../context/FooterContext";
import socket from "../socket";

export default function Listener() {
    const { setNewFeed, setNewStatus } = useContext(FooterContext);

    socket.on('newFeed', () => {
        setNewFeed(true);
    })

    socket.on('newStatus', () => {
        setNewStatus(true);
    })

    return null;
}