import React, {useEffect, useState} from 'react';
import FriendsList from '../components/FriendList';
import ChatUI from '../components/ChatUI';
import './ChatPage.css';
import DefaultUser from '../redux/default_user.png';
import {useSelector} from "react-redux";
import {SocketProvider, useSocket} from "../contexts/SocketProvider";

const ChatPage = () => {
    const user = useSelector(state => state.account.currentUser);
    // const socket = useSocket();

    const [friends, setFriends] = useState(user.friends.map((friend) => {
        let f = Object.assign({selected: false}, friend);
        f["online"] = true;
        f["messages"] = [];
        return f;
    }));

    function getFriendsMessages() {
        const messagesPromises = friends.map((friend) => {
            return fetch(`http://localhost:5000/users/${user.uid}/${friend.uid}`, {
                method: 'GET'
            }).then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            }).then((data) => {
                return {data, uid: friend.uid};
            }).catch((error) => {
                console.error(error);
            });
        });
        return Promise.all(messagesPromises);
    }

    useEffect(() => {
        getFriendsMessages().then((messages) => {
            setFriends(friends.map((f) => {
                for (const message of messages) {
                    if (f.uid === message.uid) {
                        return {...f, messages: message.data};
                    }
                }
                return f;
            }));
        });
    },[]);

    const [selectedFriend, setSelectedFriend] = useState(null);

    const handleSelectFriend = (id) => {
        const friend = friends.find(friend => friend.uid === id);
        setSelectedFriend(friend);
    };

    return (
        <SocketProvider id={user.uid}>
            <div className="chat-page">
                <div className="friends-list">
                    <FriendsList friends={friends} onSelectFriend={handleSelectFriend} selectedFriend={selectedFriend} />
                </div>
                <div className="chat-ui">
                    {selectedFriend ?
                        <ChatUI friend={selectedFriend} /> :
                        <div className="empty-chat">
                            <div className="title">Messages</div>
                            <div className="empty-message">Select a friend to start chatting!</div>
                        </div>
                    }
                </div>
            </div>
        </SocketProvider>
    );
};

export default ChatPage;
