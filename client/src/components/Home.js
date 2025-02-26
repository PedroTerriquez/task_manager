import { Login } from './Login';
import { AllProjectsContainer } from './AllProjectsContainer';
import useAuthStore from '../store/authStore';

export function Home() {
  const { isLoggedIn } = useAuthStore(); 

  return (
    <>
      {isLoggedIn ? (
        <AllProjectsContainer />
      ) : (
        <Login /> 
      )}
    </>
  );
}