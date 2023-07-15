import React from 'react';
import FriendCard from './FriendCard';

const FriendsList = ({ friends, onSelectFriend, selectedFriend }) => {
    return (
        <div>
            <div className="title">Friends</div>
            {friends.map(friend => (
                <FriendCard
                    friend={friend}
                    key={friend.id}
                    onClick={() => onSelectFriend(friend.id)}
                    isSelected={selectedFriend && friend.id === selectedFriend.id}
                />
            ))}
        </div>
    );
};


export default FriendsList;
