import React, {useContext, useEffect, useState} from 'react';
import {io} from 'socket.io-client';

const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
    const [socket, setSocket] = useState();

    useEffect(() => {
        if (id !== 0) {
            const newSocket = io(
                'https://room9-web-socket.onrender.com/',
                {query: {id}}
            )
            console.log("HERE")
            setSocket(newSocket);

            return () => newSocket.close();
        }
    }, [id])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}