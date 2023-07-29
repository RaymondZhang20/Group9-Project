import React from 'react';
import './FriendCard.css';
import Avatar from "./Avatar";

const FriendCard = ({ friend, onClick, isSelected }) => {
    return (
        <div className={`friend-card ${isSelected ? 'selected' : ''}`} onClick={onClick}>
            <Avatar avatar={friend.avatar} alt={friend.account_name} />
            <h4>{friend.account_name}</h4>
            <div className="status" style={{ backgroundColor: friend.online ? 'green' : 'grey' }}></div>
        </div>
    );
};


export default FriendCard;

