import React from "react";
import StoreItemTile from "../store/StoreItemTile";
import "./style.scss";

export default function Featured({ featuredProducts }) {

    

  return (
    <section className="featured-section bg-white py-6" data-scroll-section data-scroll-speed='0.3'>
      <div className="featured-column-layout">
        <h2>Featured Products</h2>
        
      </div><div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
      {featuredProducts?.map(product => <StoreItemTile className='m-2' key={product._id}  {...product} />)}
        </div>
    </section>
  );
}
