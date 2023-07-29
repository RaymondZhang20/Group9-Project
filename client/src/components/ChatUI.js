import React, { useEffect, useState, useRef } from 'react';
import './ChatUI.css';
import ChatMessage from './ChatMessage';
import { useSocket } from "../contexts/SocketProvider";
import Avatar from "./Avatar";

const ChatUI = ({ friend }) => {
    const [input, setInput] = useState('');
    const [change, setChange] = useState(0);
    const socket = useSocket();
    let ignore = false;

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    };

    useEffect(() => {
        if (!ignore) {
            socket.on("receive-message", (message) => {
                friend.messages.push({ ...message, sentByMe: false });
                setChange(Math.random);
                scrollToBottom();
            });
        }
        return () => { ignore = true }
    }, []);

    useEffect(scrollToBottom, [friend.messages]);

    const handleSend = async () => {
        if (input.trim() !== '') {
            const timeStamp = new Date().toISOString();
            socket.emit('send-message', { recipient: friend.uid, message: { content: input, timeStamp } });
            friend.messages.push({ content: input, sentByMe: true, timeStamp });
            setInput('');
            scrollToBottom();
        }
    };

    return (
        <div className="chat-ui">
            <div className="title">Messages</div>
            <div className="chat-header">
                <div className="chat-header-content">
                    <div className="avatar">
                        <Avatar avatar={friend.avatar} alt={friend.account_name} />
                    </div>
                </div>
                <div className="username">
                    <h5>{friend.account_name}</h5>
                </div>
                {/*<button className="btn btn-success">Voice Call</button>*/}
            </div>
            <div className="chat-body">
                {friend.messages.map((message, index) => (
                    <ChatMessage message={message} key={index} />
                ))}
                <div ref={messagesEndRef} />
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
