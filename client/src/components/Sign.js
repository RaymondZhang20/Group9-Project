import React from 'react';
import { useSelector } from 'react-redux';

export default function Sign() {
    return <div id="sign">
        <p className='text-sign'> Discover more on our page by creating an account! </p>
        <a href="/UBC/CPSC455/group_project/client/src/pages/Login"><button className='btn-sign' type="submit">Signin</button></a>
        <a href="/UBC/CPSC455/group_project/client/src/pages/Register"><button className='btn-sign' type="submit">Signup</button></a>
    </div>;
}