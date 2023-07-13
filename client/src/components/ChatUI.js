import React from 'react';
import './ChatUI.css';
import ChatMessage from './ChatMessage';

const ChatUI = () => {
    // replace with actual data
    const friend = { username: 'Dorothy111', avatar: '/path/to/avatar.jpg' };
    const messages = [
        { text: "Hello!", sentByMe: true },
        { text: "Hi, how are you?", sentByMe: false },
        { text: "I'm good, thanks. And you?", sentByMe: true },
        { text: "I'm fine too. Thanks for asking!", sentByMe: false },
    ];

    return (
        <div className="chat-ui">
            <div className="title">Messages</div>
            <div className="chat-header">
                <img src={friend.avatar} alt={friend.username} />
                <h4>{friend.username}</h4>
                {/* replace with actual icon */}
                <button>Voice Call</button>
            </div>
            <div className="chat-body">
                {messages.map((message, index) => (
                    <ChatMessage message={message} key={index} />
                ))}
            </div>
            <div className="chat-input">
                <input type="text" placeholder="Type a message" />
                <button>Send</button>
            </div>
        </div>
    );
};

export default ChatUI;
