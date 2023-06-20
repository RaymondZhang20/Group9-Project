import {Link, Navigate} from "react-router-dom";
import Map from "../components/Map";
import Footer from "../components/Footer";
import {useAuth} from "../contexts/AuthContext";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getAccountAsync} from "../redux/accountReducers/accountThunks";
import {emptyAccount} from "../redux/accountReducers/accountReducer";

export default function MapPage() {
    const {currentUser} = useAuth();
    const dispatch = useDispatch();
    useEffect(() => {
        if (currentUser) {
            dispatch(getAccountAsync(currentUser.uid));
        }
    }, [currentUser]);
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
        <div id="MapPage-whole">
            <Navigate to={"/"+currentUser.uid} replace={true} />
            <h1>MainPage</h1>
            <h2>Welcome, user</h2>
            <h2>You have 0 new matches, and 0 new messages</h2>
            <Map />

        {/* Footer Boilerplate */}
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