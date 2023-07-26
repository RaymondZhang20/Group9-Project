import React, {useState} from 'react';
import './ChatUI.css';
import ChatMessage from './ChatMessage';

const ChatUI = ({ friend }) => {
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (input.trim() !== '') {
            const timeStamp = new Date().toISOString();
            friend.messages.push({ content: input, sentByMe: true, timeStamp  });
            setInput('');

            // Send the message to the server
            // const message = {
            //     _id: 'smth',
            //     content: input,
            //     recipient: friend.uid,
            //     sender: user.uid,
            //     timeStamp: new Date().toISOString()
            // };
            //
            // await fetch('http://localhost:5000/messages', {//
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(message),
            // });
        }
    };
    return (
        <div className="chat-ui">
            <div className="title">Messages</div>
            <div className="chat-header">
                <img src={friend.avatar} alt={friend.account_name} />
                <h5>{friend.account_name}</h5>
                <button className="btn btn-success">Voice Call</button>
            </div>
            <div className="chat-body">
                {friend.messages.map((message, index) => (
                    <ChatMessage message={message} key={index} />
                ))}
            </div>
            <div className="chat-input">
                <textarea
                    placeholder="Type a message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                ></textarea>
                <button className="btn btn-success" onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default ChatUI;

