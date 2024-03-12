
import AddToCartButton from  './AddToCartButton'
export default function StoreItemTile({ onAddToCart, ...item }) {
  const { name, description, price, image, sizes } = item;
  const hasSizes = sizes?.length > 0;
  return (
    <div className="bg-gray-200 p-4 rounded-lg items-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        <img
          src={image}
          className="max-h-auto max-h-24 block mx-auto"
          alt="clothes"
        />
      </div>
      <h3 className="font-semibold text-xl my-3">{name}</h3>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <AddToCartButton hasSizes={hasSizes} price={price} onClick={onAddToCart} />
    </div>
  );
}
