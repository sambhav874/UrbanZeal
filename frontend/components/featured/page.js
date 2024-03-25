import React from "react";
import StoreItemTile from "../store/StoreItemTile";
import "./style.scss";

export default function Featured({ featuredProducts }) {

    

  return (
    <section className="featured-section bg-slate-300 py-6" data-scroll-section>
      <div className="featured-column-layout">
        <h2>Featured Products</h2>
        
      </div><div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {featuredProducts?.map(product => <StoreItemTile key={product._id}  {...product} />)}
        </div>
    </section>
  );
}
