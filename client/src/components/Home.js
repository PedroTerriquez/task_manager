import { useState } from 'react';
import { Login } from './Login';
import { AllProjectsContainer } from './AllProjectsContainer';
import useAuthStore from '../store/authStore';
import { Signup } from './Signup';

export function Home() {
  const { isLoggedIn, setLogout } = useAuthStore(); 
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {isLoggedIn && (
        <header className="flex justify-between items-center p-4 bg-blue-500 text-white">
          <h1 className="text-xl font-bold">Task Manager</h1>
          <button
            onClick={setLogout}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Logout
          </button>
        </header>
      )}
      {isLoggedIn ? (
        <AllProjectsContainer />
      ) : (
        <>
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowLogin(true)}
              className={`px-4 py-2 mr-2 ${showLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Login
            </button>
            <button
              onClick={() => setShowLogin(false)}
              className={`px-4 py-2 ${!showLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Signup
            </button>
          </div>
          {showLogin ? <Login /> : <Signup />}
        </>
      )}
    </>
  );
}