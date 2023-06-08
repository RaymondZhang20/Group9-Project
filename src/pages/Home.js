import './Home.css';
import Sign from '../components/Sign'
import {Link} from "react-router-dom";
export default function Home() {
    return (
        <div id="Home-whole">
            <h1>Home</h1>
            <Sign/>
        </div>
    );
}