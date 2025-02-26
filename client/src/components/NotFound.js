import { useNavigate } from "react-router-dom";

export function NotFound() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
                <p className="text-lg text-gray-600 mb-8">The page you are looking for does not exist.</p>
                <button
                    onClick={handleGoBack}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}