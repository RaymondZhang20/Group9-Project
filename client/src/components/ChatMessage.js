import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
    const align = message.sentByMe ? 'right' : 'left';
    return (
        <div className={`chat-message ${align}`}>
            <p>{message.text}</p>
        </div>
    );
};

export default ChatMessage;
