import { useNavigate } from "react-router-dom";

export function NotFound() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <button onClick={handleGoBack}>Go Back</button>
        </div>
    );
}