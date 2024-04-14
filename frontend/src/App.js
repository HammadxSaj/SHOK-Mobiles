import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import SearchResult from './SearchResult';
import Item from './Item';

import item1Image from './fig1.jpeg';
import item2Image from './fig2.jpeg';
import item3Image from './fig3.jpeg';
import titleImage from './SHOK.png';
import mainpage from './mainpage.png';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/search-result/${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const featuredItems = [
    { id: 1, image: item1Image, title: 'Item 1', description: 'This is the first featured item.' },
    { id: 2, image: item2Image, title: 'Item 2', description: 'Check out the details of the second featured item.' },
    { id: 3, image: item3Image, title: 'Item 3', description: 'Explore the third featured item here.' },
  ];

  
  return (
    <div className="search-container">
      <img src={titleImage} alt="SHOK Mobile" className="title" />
      <input
        type="text"
        placeholder="Search for items (i.e iPhone, Samsung, etc.)"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <div className="search-box">
        <button className="btn-search"><i className="fas fa-search"></i></button>  
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
            <Route path="/item/:id" element={<Item />} />
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