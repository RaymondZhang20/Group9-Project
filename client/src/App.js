import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import {AuthProvider, useAuth} from "./contexts/AuthContext";
import Profile from "./pages/Profile";
import PrivateRoute from "./pages/PrivateRoute";
import MapPage from "./pages/MapPage";
import Header from "./components/Header";
import UpdateUserInfo from "./pages/UpdateUserInfo";
import GameSelector from './pages/GameSelector';
import MatchingPage from './pages/MatchingPage';
import ChatPage from './pages/ChatPage';
import AddGame from './pages/AddGame';
import {SocketProvider} from "./contexts/SocketProvider";

function App() {
  const {currentUser} = useAuth();

  return (
        <AuthProvider>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/game/add" element={<AddGame />} />
                <Route path="/:id"  element={<PrivateRoute>
                    <MapPage />
                </PrivateRoute>} />
                <Route path="/:id/update"  element={<PrivateRoute>
                    <UpdateUserInfo />
                </PrivateRoute>} />
                <Route path="/:id/game"  element={<PrivateRoute>
                    <GameSelector />
                </PrivateRoute>} />
                <Route path="/:id/profile"  element={<PrivateRoute>
                    <Profile />
                </PrivateRoute>} />
                <Route path="/:id/chat"  element={<PrivateRoute>
                    <ChatPage />
                </PrivateRoute>} />
                <Route path="/:id/matching"  element={<PrivateRoute>
                    <MatchingPage />
                </PrivateRoute>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthProvider>
  );
}

export default App;
