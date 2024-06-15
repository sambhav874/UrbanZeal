import AddToCartButton from './AddToCartButton';

export default function StoreItemTile({ onAddToCart, ...item }) {
  const { name, description, price, image, category, sizes } = item;
  const hasSizes = sizes?.length > 0;

  return (
    <div className="card flex flex-col w-72 h-100  p-4 text-white bg-gradient-to-br from-gray-200 to-gray-400 border-2 border-transparent rounded-lg transition-transform duration-600 cursor-pointer transform-origin-right-bottom shadow-lg hover:shadow-xl hover:duration-1000 hover:bg-gradient-to-br hover:from-gray-400 hover:to-gray-200 hover:scale-105">
      <div className="main-content flex-1">
        <div className="header flex justify-between">
          <span className="font-semibold text-gray-800">{category}</span>
          <span className="font-semibold text-gray-800">{price}</span>
        </div>
        <div className=" flex justify-center items-center h-40">
          <img src={image[0]} className="w-40 h-auto" alt={name} />
        </div>
        <p className="heading text-xl font-semibold my-6">{name}</p>
        <div className="categories flex gap-2">
          <span className="bg-gray-600 py-1 px-2 text-xs font-semibold uppercase rounded-full">{description}</span>
        </div>
      </div>
      <div className="footer text-sm font-semibold text-gray-700 mt-auto">
        <AddToCartButton hasSizes={hasSizes} price={price} onClick={onAddToCart} />
      </div>
    </div>
  );
}
