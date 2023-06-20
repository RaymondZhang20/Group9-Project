import React from 'react';
import {Link} from "react-router-dom";

export default function Sign() {
    return <div id="sign">
        <p className='text-sign'> Discover more on our page by creating an account! </p>
        <Link to="/login"><button className='btn-sign' type="submit">Signin</button></Link>
        <Link to="/register"><button className='btn-sign' type="submit">Signup</button></Link>
    </div>;
}