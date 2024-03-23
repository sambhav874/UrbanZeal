import React from "react";
import StoreItem from "../store/StoreItem";
import "./style.scss";

export default function Featured({ featuredProducts }) {
  return (
    <section className="featured-section" data-scroll-section>
      <div className="featured-column-layout">
        <h2>Featured Products</h2>
        
      </div><div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts?.map((product) => (
            <div key={product._id}><img href={product.image} width={128} height={128}></img></div>
            
          ))}
        </div>
    </section>
  );
}
