import {Button, Card} from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext";
import {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom"

export default function Account() {
    const [error, setError] = useState("");
    const {logout, currentUser} = useAuth();
    const navigate = useNavigate();
    async function handleLogout(e) {
        e.preventDefault();
        setError("");
        try {
            await logout();
            navigate("/");
        } catch (e) {
            setError("Cannot log out because: " + e.message);
        }
    }
    return (
        <div id="Account-whole">
            <Navigate to={"/"+currentUser.uid} replace={true} />
            <h1>Account Profile</h1>
            <Card>
                <Card.Body>
                    <h1 className="text-center">Profile</h1>
                    <p>Email: {currentUser.email}</p>
                    <p>rest...</p>
                </Card.Body>
            </Card>
            <div className="text-center">
                <Button className="w-75 mt-3" onClick={handleLogout}>LogOut</Button>
            </div>
        </div>
    );
}