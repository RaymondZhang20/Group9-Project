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
                'http://localhost:5001',
                {query: {id}}
            )
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