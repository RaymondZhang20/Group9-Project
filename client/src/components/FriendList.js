import React from 'react';
import FriendCard from './FriendCard';

const FriendsList = ({ friends }) => {
    return (
        <div>
            <div className="title">Friends</div>
            {friends.map(friend => (
                <FriendCard friend={friend} key={friend.id} />
            ))}
        </div>
    );
};

export default FriendsList;
