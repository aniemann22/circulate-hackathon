import React from 'react';
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import MarketplacePromo from "../components/MarketplacePromo.tsx";

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <MarketplacePromo />
      <Footer />
    </div>
  );
};

export default Home;
