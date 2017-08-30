import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <div>
      <h3>Welcome Home.</h3>
      <p><Link to="/add" className="links">Add New Item</Link></p>
      <p><Link to="/view" className="links">View List</Link></p>
    </div>
  </div>
);

export default Home;

