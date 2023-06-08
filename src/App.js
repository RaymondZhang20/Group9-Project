import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import {AuthProvider, useAuth} from "./contexts/AuthContext";
import Account from "./pages/Account";
import PrivateRoute from "./pages/PrivateRoute";
import MapPage from "./pages/MapPage";


function App() {
  const {currentUser} = useAuth();

  return (
        <AuthProvider>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/:id"  element={<PrivateRoute>
                    <Account />
                </PrivateRoute>} />
                <Route path="/:id/map"  element={<PrivateRoute>
                    <MapPage />
                </PrivateRoute>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthProvider>
  );
}

export default App;
