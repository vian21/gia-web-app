import { createContext, useState } from "react";

export const FooterContext = createContext();

export const FooterProvider = ({ children }) => {

    const [newFeed, setNewFeed] = useState(false);
    const [newStatus, setNewStatus] = useState(false);

    const [reloadHome, setReload] = useState(false);

    return (
        <FooterContext.Provider value={{ newFeed, setNewFeed, newStatus, setNewStatus, reloadHome, setReload }}>
            {children}
        </FooterContext.Provider>
    )
}