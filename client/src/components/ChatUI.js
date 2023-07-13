import React from 'react';
import './ChatUI.css';
import ChatMessage from './ChatMessage';

const ChatUI = ({ friend }) => {
    return (
        <div className="chat-ui">
            <div className="title">Messages</div>
            <div className="chat-header">
                <img src={friend.avatar} alt={friend.username} />
                <h4>{friend.username}</h4>
                {/* replace with icon? */}
                <button>Voice Call</button>
            </div>
            <div className="chat-body">
                {friend.messages.map((message, index) => (
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
