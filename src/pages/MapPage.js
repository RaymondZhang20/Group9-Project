import {Link} from "react-router-dom";
import Map from "../components/Map";
import Footer from "../components/Footer";

export default function MapPage() {
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
            <h1>MapPage</h1>
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