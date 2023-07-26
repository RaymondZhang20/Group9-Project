import React from 'react';
import FriendCard from './FriendCard';

const FriendsList = ({ friends, onSelectFriend, selectedFriend }) => {
    return (
        <div>
            <div className="title">Friends</div>
            {friends.length > 0 ? (
                friends.map(friend => (
                    <FriendCard
                        friend={friend}
                        key={friend.uid}
                        onClick={() => onSelectFriend(friend.uid)}
                        isSelected={selectedFriend && friend.uid === selectedFriend.uid}
                    />
                ))
            ) : (
                <div className="empty-message">You have no one to chat with, go make some friends!</div>
            )}
        </div>
    );
};

export default FriendsList;