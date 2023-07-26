import React, {useEffect, useState} from 'react';
import FriendsList from '../components/FriendList';
import ChatUI from '../components/ChatUI';
import './ChatPage.css';
import DefaultUser from '../redux/default_user.png';
import {useSelector} from "react-redux";
import {SocketProvider} from "../contexts/SocketProvider";

const ChatPage = () => {
    //attempt to fetch from database
    // const dispatch = useDispatch();
    // const { currentUser } = useAuth();
    // const { account } = useSelector(state => state.account);
    // const friends = account.friends || [];
    const user = useSelector(state => state.account.currentUser);

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

    //     [
    //     {
    //         id: 1,
    //         username: 'Dorothy111',
    //         online: true,
    //         avatar: DefaultUser,
    //         messages: [
    //             { text: "Hello!", sentByMe: true },
    //             { text: "Hi, how are you?", sentByMe: false },
    //             { text: "I'm good, thanks. And you?", sentByMe: true },
    //             { text: "I'm fine too. Thanks for asking!", sentByMe: false },
    //         ]
    //     },
    //     {
    //         id: 2,
    //         username: 'Dorothy222',
    //         online: false,
    //         avatar: DefaultUser,
    //         messages: [
    //             { text: "Hey!", sentByMe: false },
    //             { text: "Hi, what's up?", sentByMe: true },
    //             { text: "Wanna go out for dinner?", sentByMe: false },
    //             { text: "Sure, why not", sentByMe: true },
    //         ]
    //     },
    //     {
    //         id: 3,
    //         username: 'Dorothy333',
    //         online: true,
    //         avatar: DefaultUser,
    //         messages: [
    //             { text: "Hey there!", sentByMe: true },
    //             { text: "Hi! How's it going?", sentByMe: false },
    //             { text: "I'm doing well. What about you?", sentByMe: true },
    //             { text: "I'm doing great too!", sentByMe: false },
    //             { text: "That's nice to hear. Have any plans for the weekend?", sentByMe: true },
    //             { text: "No, not yet. Any suggestions?", sentByMe: false },
    //             { text: "How about a hike?", sentByMe: true },
    //             { text: "Sounds like a plan. I'm in!", sentByMe: false },
    //             { text: "Great! I'll send you the details.", sentByMe: true },
    //             { text: "Looking forward to it. Thanks!", sentByMe: false },
    //         ]
    //     },
    // ]);

    const [selectedFriend, setSelectedFriend] = useState(null);

    // useEffect(() => {
    //     if (currentUser && currentUser.uid) {
    //         dispatch(getAccountAsync(currentUser.uid));
    //     }
    // }, [dispatch, currentUser]);

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
