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

    function setMessages(friendUid) {
        return fetch(`http://localhost:5000/users/${user.uid}/${friendUid}`, {
            method: 'GET'
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        }).then((data) => {
            return data;
        }).catch((error) => {
            console.error(error);
        });
    }

    const [friends, setFriends] = useState(user.friends.map((friend) => {
        let f = Object.assign({selected: false}, friend);
        f["online"] = true;
        f["avatar"] = DefaultUser;
        f["messages"] = [];
        return f;
    }));

    useEffect(() => {
        friends.forEach((friend) => {
            fetch(`http://localhost:5000/users/${user.uid}/${friend.uid}`, {
                method: 'GET'
            }).then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            }).then((data) => {
                setFriends(friends.map((f) => {
                    if (f.uid === friend.uid) {
                        return {...f, messages: data};
                    } else {
                        return f;
                    }
                }));
            }).catch((error) => {
                console.error(error);
            });
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
