import React from "react";
import FeaturedItemTile from "../store/FeaturedItemTile";
import "./style.scss";

export default function Featured({ featuredProducts }) {

    

  return (
    <section className="featured-section bg-white py-6 max-h-screen" data-scroll-section data-scroll-speed='0.3'>
      <div className="featured-column-layout ">
        <h2>Featured Products</h2>
        
      </div><div className="flex gap-8 overflow-x-scroll py-6 ">
      {featuredProducts?.map(product => <div className="grid gap-4"><FeaturedItemTile  key={product._id}  {...product} /></div>)}
        </div>
    </section>


  );
}
