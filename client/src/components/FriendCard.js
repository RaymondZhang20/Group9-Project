import React from 'react';
import './FriendCard.css';

const FriendCard = ({ friend }) => {
    return (
        <div className="friend-card">
            <img src={friend.avatar} alt={friend.username} />
            <h4>{friend.username}</h4>
            <div className="status" style={{ backgroundColor: friend.online ? 'green' : 'grey' }}></div>
        </div>
    );
};

export default FriendCard;

