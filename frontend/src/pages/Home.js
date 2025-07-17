import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-landing">
      <h1 className="home-title">🛍️ Welcome to GenZ Market</h1>
      <p className="home-subtitle">
      Buy & Sell the coolest GenZ stuff
      </p>
      <Link to="/explore" className="explore-btn">Explore Listings</Link>
    </div>
  );
}

export default Home;
