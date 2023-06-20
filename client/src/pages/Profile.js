import {Button, Card} from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext";
import {useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom"
import {getAccountAsync} from "../redux/accountReducers/accountThunks";
import {useDispatch} from "react-redux";
import {emptyAccount} from "../redux/accountReducers/accountReducer";

export default function Profile() {
    const [error, setError] = useState("");
    const {logout, currentUser} = useAuth();
    const dispatch = useDispatch();
    useEffect(() => {
        if (currentUser) {
            dispatch(getAccountAsync(currentUser.uid));
        }
    }, [currentUser]);
    const navigate = useNavigate();
    const uid = currentUser.uid;

    function handleToUpdate(e) {
        e.preventDefault();
        navigate(`/${uid}/update`);
    }
    async function handleLogout(e) {
        e.preventDefault();
        setError("");
        try {
            await logout();
            dispatch(emptyAccount());
            navigate(`/`);
        } catch (e) {
            setError("Cannot log out because: " + e.message);
        }
    }
    return (
        <div id="Account-whole">
            <h1>Profile Profile</h1>
            <Card>
                <Card.Body>
                    <h1 className="text-center">Profile</h1>
                    <p>Email: {currentUser.email}</p>
                    <p>rest...</p>
                </Card.Body>
            </Card>
            <div className="text-center">
                <Button className="w-75 mt-3" onClick={handleToUpdate}>Update My Info</Button>
                <Button className="w-75 mt-3" onClick={handleLogout}>LogOut</Button>
            </div>
        </div>
    );
}