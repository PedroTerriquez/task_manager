import { Login } from './Login';
import { AllProjectsContainer } from './AllProjectsContainer';
import useAuthStore from '../store/authStore';
import { useEffect } from 'react';
import { Signup } from './Signup';

import { io } from "socket.io-client";
const socket = io("http://localhost:3000"); 

export function Home() {
  const { isLoggedIn, setLogout } = useAuthStore(); 

    useEffect(() => {
          console.log('Use Effect ran llllllask created');
        socket.on("newTask", (newTask) => {
          console.log('New task created', newTask);
        });

        return () => {
            socket.off("taskCreated");
        };
    }, []);


  return (
    <>
      {isLoggedIn && (
        <header>
          <button onClick={setLogout}>Logout</button>
        </header>
      )}
      {isLoggedIn ? <AllProjectsContainer /> : <><Login /><Signup /></>}
    </>
  );
}