export default function AddToCartButton(
    {hasSizes , onClick , price , }
){
    return(
        <button
        onClick={onClick}
        className="mt-4 text-white bg-black rounded-full px-8 py-2"
      >
        {hasSizes ? (
          <span>Add to Cart (From Rs.{price})</span>
        ) : (
          <span>Add to card Rs.{price}</span>
        )}
      </button>
    )
}