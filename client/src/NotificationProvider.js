import { createContext, useState, useContext, useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message) => {
        setNotifications((prev) => [...prev, message]);

        setTimeout(() => {
            setNotifications((prev) => prev.slice(1));
        }, 3000);
    };

    useEffect(() => {
        socket.on("newTask", (newTask) => {
          addNotification('New task created');
        });

        return () => {
            socket.off("taskCreated");
        };
    }, []);

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            <div className="relative">
                {children}
                <div className="absolute top-0 right-0 mt-4 mr-4 space-y-2">
                    {notifications.map((notif, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 text-white bg-blue-500 rounded shadow-md"
                        >
                            {notif}
                        </div>
                    ))}
                </div>
            </div>
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    return useContext(NotificationContext);
}