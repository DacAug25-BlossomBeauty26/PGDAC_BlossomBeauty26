const ProductCard = ({
  product,
  isWishlisted,
  onAddCart,
  onAddWishlist,
  onRemoveWishlist
}) => {

  return (

    <div className="card h-100 shadow-sm">

      <img
        src={product.imageUrl}
        className="card-img-top"
        style={{ height: "250px", objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">

        <h5>{product.productName}</h5>

        <p>₹{product.price}</p>

        <button
          className="btn btn-outline-dark mt-auto"
          onClick={() => onAddCart(product)}
        >
          Add to Cart
        </button>

        {isWishlisted ? (

          <button
            className="btn btn-outline-secondary mt-2"
            onClick={() => onRemoveWishlist(product)}
          >
            Remove Wishlist
          </button>

        ) : (

          <button
            className="btn btn-outline-danger mt-2"
            onClick={() => onAddWishlist(product)}
          >
            Add Wishlist
          </button>

        )}

      </div>

    </div>

  );
};

export default ProductCard;
