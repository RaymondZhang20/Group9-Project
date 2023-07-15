import React from 'react';
import './ChatUI.css';
import ChatMessage from './ChatMessage';

const ChatUI = ({ friend }) => {
    return (
        <div className="chat-ui">
            <div className="title">Messages</div>
            <div className="chat-header">
                <img src={friend.avatar} alt={friend.username} />
                <h5>{friend.username}</h5>
                <button className="btn btn-success">Voice Call</button>
            </div>
            <div className="chat-body">
                {friend.messages.map((message, index) => (
                    <ChatMessage message={message} key={index} />
                ))}
            </div>
            <div className="chat-input">
                <textarea placeholder="Type a message"></textarea>
                <button className="btn btn-success">Send</button>
            </div>
        </div>
    );
};

export default ChatUI;

