import './Home.css';
import {Link} from "react-router-dom";
export default function Home() {
    return (
        <div id="Home-whole">
            <h1>Home</h1>
            <Link to="/login">Login</Link>
            <br/>
            <Link to="/register">Register</Link>
        </div>
    );
}