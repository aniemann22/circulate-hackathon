import React from 'react';
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import ProductListing from "../components/ProductListing.tsx";

const Products: React.FC = () => {
  return (
    <div>
      <Header />
      <ProductListing />
  
      <Footer />
    </div>
  );
};

export default Products;
