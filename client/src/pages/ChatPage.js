import React, { useState } from 'react';
import FriendsList from '../components/FriendList';
import ChatUI from '../components/ChatUI';
import './ChatPage.css';
import DefaultUser from '../redux/default_user.png';

const ChatPage = () => {
    const [friends] = useState([
        {
            id: 1,
            username: 'Dorothy111',
            online: true,
            avatar: DefaultUser,
            messages: [
                { text: "Hello!", sentByMe: true },
                { text: "Hi, how are you?", sentByMe: false },
                { text: "I'm good, thanks. And you?", sentByMe: true },
                { text: "I'm fine too. Thanks for asking!", sentByMe: false },
            ]
        },
        {
            id: 2,
            username: 'Dorothy222',
            online: false,
            avatar: DefaultUser,
            messages: [
                { text: "Hey!", sentByMe: false },
                { text: "Hi, what's up?", sentByMe: true },
                { text: "Wanna go out for dinner?", sentByMe: false },
                { text: "Sure, why not", sentByMe: true },
            ]
        },
    ]);

    const [selectedFriend, setSelectedFriend] = useState(friends[0]);

    const handleSelectFriend = (id) => {
        const friend = friends.find(friend => friend.id === id);
        setSelectedFriend(friend);
    };

    return (
        <div className="chat-page">
            <div className="friends-list">
                <FriendsList friends={friends} onSelectFriend={handleSelectFriend} selectedFriend={selectedFriend} />
            </div>
            <div className="chat-ui">
                <ChatUI friend={selectedFriend} />
            </div>
        </div>
    );
};

export default ChatPage;
