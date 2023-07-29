import React from 'react';
import {Card} from 'react-bootstrap'

export default function Avatar({avatar, alt, className, style, onClick}) {
    const url = `http://localhost:5000/img/avatar/${avatar}`;
    return (
        <Card.Img src={url} alt={alt} className={className} style={style} onClick={onClick}/>
    );
}