import { Login } from './Login';
import { AllProjectsContainer } from './AllProjectsContainer';
import useAuthStore from '../store/authStore';
import { Signup } from './Signup';

export function Home() {
  const { isLoggedIn, setLogout } = useAuthStore(); 

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