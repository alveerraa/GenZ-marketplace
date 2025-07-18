import { Link } from "react-router-dom";
import img from "../assets/Shopping-rafiki.png";

function Home() {
  return (
    <div className="home-hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="home-title">🛍️ Welcome to <span className="highlight">GenZ Market</span></h1>
          <p className="home-subtitle">Buy & Sell the coolest GenZ stuff</p>
          <Link to="/explore" className="explore-btn">🔥 Explore Listings</Link>
        </div>
        <div className="hero-image">
          <img src={img} alt="Shopping illustration" />
        </div>
      </div>
    </div>
  );
}

export default Home;
