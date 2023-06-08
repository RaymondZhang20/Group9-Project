import React from 'react';
import { useSelector } from 'react-redux';

export default function Sign() {
    return <div id="sign">
        <p className='text-sign'> Discover more on our page by creating an account! </p>
        <a href="/login"><button className='btn-sign' type="submit">Signin</button></a>
        <a href="/register"><button className='btn-sign' type="submit">Signup</button></a>
    </div>;
}