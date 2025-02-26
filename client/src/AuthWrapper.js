import { Navigate } from 'react-router-dom';
import useAuthStore from "./store/authStore";

export const AuthWrapper = ({ children }) => {
    const { isLoggedIn } = useAuthStore(); 

    if(!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
