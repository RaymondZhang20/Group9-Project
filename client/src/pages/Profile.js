import {Button, Card, ListGroup} from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext";
import {useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom"
import {getAccountAsync} from "../redux/accountReducers/accountThunks";
import {useDispatch} from "react-redux";
import {emptyAccount} from "../redux/accountReducers/accountReducer";
import {ProfileField} from '../components/ProfileField';

export default function Profile() {
    // test data, will remove later
    const userInfo = {  single: 
                                [{field: "first", value: "Tom"},
                                {field: "last", value: "Lee"},
                                {field: "timezone", value: "UTC-08:00"},
                                {field: "location", value: "Canada"},
                                {field: "pronoun", value: "He/Him"}],
                        multiple: 
                                [{field: "time", value: ["Morning", "Afternoon", "Evening"]}, 
                                {field: "language", value: ["English" ,"Spanish", "French", "German", "Mandarin"]},
                                {field: "platform", value: ["PC", "XBOX", "NS"]}]};
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
        <div id="Account-whole" style={{ minHeight: '100vh', display: 'grid', justifyContent: 'center', paddingTop: '60px' }}>
            <Card className="card-container" style={{ width: '550px' }}>
                <Card.Body>
                    <h1 className="text-center">Profile</h1>
                    <ListGroup variant="flush">
                        {userInfo.single.map((field) => {
                        return <ListGroup.Item className="m-2"> 
                                    <Card.Subtitle className="mb-3 text-muted">{field.field}: {field.value}</Card.Subtitle>
                                </ListGroup.Item>
                        })}
                        {userInfo.multiple.map((field) => {
                        return <ListGroup.Item className="m-2"> 
                                    <Card.Subtitle className="mb-3 text-muted">{field.field}</Card.Subtitle>
                                    <ProfileField value={field.value}/>
                                </ListGroup.Item>
                        })}
                    </ListGroup>
                </Card.Body>
            </Card>
            <div className="text-center">
                <Button className="w-75 mt-3" onClick={handleToUpdate}>Update My Info</Button>
                <Button className="w-75 mt-3" onClick={handleLogout}>LogOut</Button>
            </div>
        </div>
    );
}