import React, { useState } from 'react';
import axios from 'axios';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import SearchResult from './SearchResult';
// import Item from './Item';
import titleImage from './front.png';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000000]); // Initial price range

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/search-result/${encodeURIComponent(searchQuery)}`);
    }
  };

  // const handleSearch = () => {
  //   if (searchQuery.trim() !== '') {
  //     const queryParams = new URLSearchParams({
  //       minPrice: priceRange[0],
  //       maxPrice: priceRange[1]
  //     });
  //     navigate(`/search-result/${encodeURIComponent(searchQuery)}&${queryParams.toString()}`);
  //   }
  // };
  

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePriceChange = (value) => {
    console.log("Selected Price Range:", value);
    setPriceRange(value);
  };

  // const handleSearchByPrice = () => {

  //   const minPrice = priceRange[0];
  // const maxPrice = priceRange[1];
  
  // console.log("Minimum Price:", minPrice);
  // console.log("Maximum Price:", maxPrice);

  //   axios.get('/api/search', {
  //     params: {
  //       minPrice: minPrice,
  //       maxPrice: maxPrice
  //     }
  //   })
  //   .then(response => {
  //     console.log(response.data);
  //     console.log();
  //   })
  //   .catch(error => {
  //     console.error('Error fetching data:', error);
  //   });
  // };

  const handleCombinedSearch = () => {
    handleSearch();
    // handleSearchByPrice();
  };

  return (
    <div className="search-container">
      <img src={titleImage} alt="SHOK Mobile" className="title" />
      <input
        type="text"
        placeholder="Search for items (i.e iPhone, Samsung, etc.)"
        value={searchQuery}
        onChange={handleInputChange}
      />
      {/* <div className="pric-slider">
        <Slider
          min={0}
          max={1000000}
          defaultValue={priceRange}
          steps = {100}
          onChange={handlePriceChange}
          range
        />
        <span>Price Range: Rs{priceRange[0]} - Rs{priceRange[1]}</span>
      </div> */}
      <div className="search-box">
        <button type="button" onClick={handleCombinedSearch}>🔍</button> 
      </div>
    </div>
  );
};

const App = () => {
  return (  
    <Router>
      <div className="shop-seeker">
        <header className="header">
          <div className="brand">SHOK Mobile</div>
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              {/* <li><Link to="/categories">Categories</Link></li> */}
            </ul>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/categories" element={<Categories />} /> */}
            <Route path="/search-result/:query" element={<SearchResult />} />
            {/* <Route path="/item/:id" element={<Item />} /> */}                   /*no apparent need*/
          </Routes>
        </main>
        <footer className="footer">
          Copyrights SHOKMobile.com
        </footer>
      </div>
    </Router>
  );
};

export default App;
