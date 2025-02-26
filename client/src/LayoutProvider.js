import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from './store/authStore';
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

const LayoutContext = createContext();

export function LayoutProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const { isLoggedIn, setLogout } = useAuthStore();
    const navigate = useNavigate();

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
        <LayoutContext.Provider value={{ addNotification }}>
            <div className="relative">
                {isLoggedIn && (
                    <header className="flex justify-between items-center p-4 bg-blue-500 text-white">
                        <h1 onClick={ () => navigate('/') } className="text-xl font-bold">Task Manager</h1>
                        <button
                            onClick={setLogout}
                            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                        >
                            Logout
                        </button>
                    </header>
                )}
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
        </LayoutContext.Provider>
    );
}

export function useLayout() {
    return useContext(LayoutContext);
}