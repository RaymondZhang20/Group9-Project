import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
    const align = message.sentByMe ? 'right' : 'left';
    // Format the timestamp
    const timestamp = new Date(message.timeStamp).toLocaleString();
    return (
        <div className={`chat-message ${align}`}>
            <p>{message.content}</p>
            <span className="timestamp">{timestamp}</span>
        </div>
    );
};

export default ChatMessage;
