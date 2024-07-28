import React from "react";
import FeaturedItem from "../store/FeaturedItem";
import "./style.scss";

export default function Featured({ featuredProducts }) {
  console.log(featuredProducts);

  return (
    <section className="featured-section bg-white py-6 max-h-screen" data-scroll-section data-scroll-speed="0.3">
      <div className="featured-column-layout">
        <h2>Featured Products</h2>
      </div>
      <div className="featured-products-wrapper flex gap-8 overflow-x-scroll py-6">
        {featuredProducts?.map(product => (
          <div key={product._id} className="featured-product-item grid gap-4">
            <FeaturedItem {...product} />
          </div>
        ))}
      </div>
    </section>
  );
}
