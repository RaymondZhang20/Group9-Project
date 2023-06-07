import React, {useContext, useEffect, useState} from "react";
import {auth} from "../firebase"

const AuthContext = React.createContext("");
export function useAuth() {
    return useContext(AuthContext);
}



function logout() {
    return auth.signOut();
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function register(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);
    const val = {currentUser, login, register, logout};
    return (
        <AuthContext.Provider value={val}>
            {!loading && children}
        </AuthContext.Provider>
    );
}