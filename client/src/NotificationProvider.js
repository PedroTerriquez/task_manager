import { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message) => {
        setNotifications((prev) => [...prev, message]);

        setTimeout(() => {
            setNotifications((prev) => prev.slice(1));
        }, 3000);
    };

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            <div>
                {children}
                <div>
                    {notifications.map((notif, index) => (
                        <div key={index}>{notif}</div>
                    ))}
                </div>
            </div>
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    return useContext(NotificationContext);
}