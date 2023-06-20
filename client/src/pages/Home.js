import './Home.css';
import Sign from '../components/Sign'
import bg from '../images/bg.jpg'
import {Link} from "react-router-dom";
export default function Home() {
    return (
        <div id="Home-whole">
            <div id='home'>
                <img className='bg' src={bg}/>
                <h1 className='logo'>A platform for gamers <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to connect, communicate, and more...</h1>
            </div>
            <Sign/>
        </div>
    );
}