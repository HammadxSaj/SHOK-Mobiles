import React, { useEffect, useState } from 'react';
import './SearchResult.css';
import { useLocation } from 'react-router-dom';

function SearchResult() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const location = useLocation();
  const [lowestPrice, setLowestPrice] = useState(null);
  const [averagePrice, setAveragePrice] = useState(null);

  useEffect(() => {
    const searchQuery = decodeURIComponent(location.pathname.split('/').pop());
    console.log('Search query:', searchQuery);
    setSearch(searchQuery);
    fetchItems(searchQuery);
    // filterItems(searchQuery); // Perform filtering
    // setSearchPerformed(true);
  }, [location]);

  useEffect(() => {
    calculatePrices();
  }, [filteredItems]);

  const fetchItems = async (searchQuery) => {
    try {
      const data = await fetch(`/result?query=${searchQuery}`);
      const items = await data.json();

      // Convert item prices to strings before setting them in the state
      const itemsWithStringPrices = items.map((item) => {
        return {
          ...item,
          price: String(item.price), // Convert price to string
        };
      });

      setItems(itemsWithStringPrices);
      filterItems(searchQuery);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleSearch = () => {
    const searchQuery = search.trim();
    if (searchQuery !== '') {
      filterItems(searchQuery);
      setSearchPerformed(true);
    } else {
      setFilteredItems(items); // Set filteredItems to all items if search is empty
      setSearchPerformed(false);
    }
  };

  const filterItems = (searchQuery) => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const calculatePrices = () => {
    if (filteredItems.length > 0) {
      const prices = filteredItems.map((item) => {
        let priceWithoutCurrency = item.price.replace('Rs.', '').trim(); 
        priceWithoutCurrency = priceWithoutCurrency.replace(/,/g, ''); 

        if (!isNaN(parseFloat(priceWithoutCurrency))) {
          return parseFloat(priceWithoutCurrency); // Convert to number
        }
        return 0; // If the price is not a valid number, default to 0
      });

      const validPrices = prices.filter(price => price !== 0); // Remove invalid prices (zeroes)

      if (validPrices.length > 0) {
        const lowest = Math.min(...validPrices);
        setLowestPrice(lowest.toFixed(2));

        const sum = validPrices.reduce((total, currVal) => total + currVal, 0);
        const average = sum / validPrices.length;
        setAveragePrice(average.toFixed(2));
      } else {
        setLowestPrice(null);
        setAveragePrice(null);
      }
    } else {
      setLowestPrice(null);
      setAveragePrice(null);
    }
  };


  return (
    <div className="search-result">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Want to look for something else?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="price-info">
        <div className="price-section">
          <span>Average price: {averagePrice ? `Rs. ${Number(averagePrice).toLocaleString()}` : 'TBD'}</span>
        </div>
        <div className="price-section">
          <span>Lowest price: {lowestPrice ? `Rs. ${Number(lowestPrice).toLocaleString()}` : 'TBD'}</span>
        </div>
      </div>

      <section className="listings">
        <h2>
          {searchPerformed
            ? `Found ${filteredItems.length} listings`
            : 'All Listings'}
        </h2>
        <div className="listings-container">
          {filteredItems.map((item) => (
            <a
              key={item.id}
              className="listing"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="listing-details">
                <h2 className="card-title">{item.name}</h2>
                <p className="card-text">Price: {`Rs. ${Number(item.price).toLocaleString()}`}</p>
                <p className="card-text">Store: {item.store}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SearchResult;
