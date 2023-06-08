import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import {AuthProvider, useAuth} from "./contexts/AuthContext";
import Account from "./pages/Account";
import PrivateRoute from "./pages/PrivateRoute";
import Footer from "./components/Footer";
import MapPage from "./pages/MapPage";
import Header from "./components/Header";

function App() {
  const {currentUser} = useAuth();

  {/* Footer Boilerplate */}
  const markers = [
      { id: 1, name: 'Marker 1', filter: 'Category A' },
      { id: 2, name: 'Marker 2', filter: 'Category B' },
      { id: 3, name: 'Marker 3', filter: 'Category A' },
      { id: 4, name: 'Marker 4', filter: 'Category C' },
  ];

  const filterOptions = ['Category A', 'Category B', 'Category C'];

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    // Perform filtering logic based on the selected filter
    // Update the map display accordingly
    console.log('Selected filter:', selectedFilter);
  };

  const handleSearch = (searchText) => {
    // Perform search logic based on the entered search text
    // Update the map display accordingly
    console.log('Search text:', searchText);
  };
  {/* Ends here */}

  return (
    <div>
        <AuthProvider>
            <Header />
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

        {/* Footer Boilerplate */}
        <h1>Map Application</h1>
        <Footer
              markers={markers}
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
        />
        {/* Ends here */}
    </div>
  );
}

export default App;
