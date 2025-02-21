import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function TaskShow() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;


    return (
        <>
            <h1>{state?.title}</h1>
            <h3>{state?.description}</h3>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </>
    )
}