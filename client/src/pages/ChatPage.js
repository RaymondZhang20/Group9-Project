import React from 'react';
import FriendsList from '../components/FriendList';
import ChatUI from '../components/ChatUI';
import './ChatPage.css';

const ChatPage = () => {
    //Dummy list. Replace this with actual data.
    const friends = [
        { id: 1, username: 'Dorothy111', online: true, avatar: '../../redux/default_user.png' },
        { id: 2, username: 'Dorothy222', online: false, avatar: '../../redux/default_user.png' },
    ];

    return (
        <div className="chat-page">
            <div className="friends-list">
                <FriendsList friends={friends} />
            </div>
            <div className="chat-ui">
                <ChatUI />
            </div>
        </div>
    );
};

export default ChatPage;
