import React, { useEffect, useState } from 'react';
import './SearchResult.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function SearchResult() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  // const [items, setFilteredItems] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const location = useLocation();
  const [lowestPrice, setLowestPrice] = useState(null);
  const [averagePrice, setAveragePrice] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 1000000]); 


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
  }, [items]);

  const fetchItems = async (searchQuery) => {
    try {
      // const data = await fetch(`/result?query=${searchQuery}`);
      // const items = await data.json();

      const response = await axios.get('/result', {
          params: {
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            query: searchQuery
          }
        });

        const items =  response.data;
        console.log('Items:', items);

      // Convert item prices to strings before setting them in the state
      const itemsWithStringPrices = items.map((items) => {
        return {
          ...items,
          price: String(items.price), // Convert price to string
        };
      });

      setItems(itemsWithStringPrices);
      // filterItems(searchQuery);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleSearch = () => {
    const searchQuery = search.trim();
    if (searchQuery !== '') {
      fetchItems(searchQuery);
      // setItems(items);
      setSearchPerformed(true);
    } else {
      // setFilteredItems(items); // Set items to all items if search is empty
      setSearchPerformed(false);
    }
  };


  const calculatePrices = () => {
    if (items.length > 0) {
      const prices = items.map((items) => {
        let priceWithoutCurrency = items.price.replace('Rs.', '').trim(); 
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

  const handlePriceChange = (value) => {
    setPriceRange(value);
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
      <div className="price-slider">
        <Slider
          min={0}
          max={1000000}
          range
          defaultValue={[0, 1000000]}
          value={priceRange}
          onChange={handlePriceChange}
        />
        <div className="price-range">
          Price Range: Rs{priceRange[0]} - Rs{priceRange[1]}
        </div>
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
            ? `Found ${items.length} listings`
            : 'All Listings'}
        </h2>
        <div className="listings-container">
          {items.map((items) => (
            <a
              key={items.id}
              className="listing"
              href={items.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={items.image} alt={items.name} className="item-image" />
              <div className="listing-details">
                <h2 className="card-title">{items.name}</h2>
                <p className="card-text">Price: {`Rs. ${Number(items.price).toLocaleString()}`}</p>
                <p className="card-text">Store: {items.store}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SearchResult;
