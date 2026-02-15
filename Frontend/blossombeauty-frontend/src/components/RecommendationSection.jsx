import ProductCard from "./ProductCard";

const RecommendationSection = ({
  showRecommendation,
  products,
  wishlistItems,
  onAddCart,
  onAddWishlist,
  onRemoveWishlist,
  onClose
}) => {

  if (!showRecommendation || products.length === 0) return null;

  return (

    <div className="container my-5 position-relative">

      <h3 className="text-center mb-4">
        Recommended for You
      </h3>

      <button
        className="btn btn-sm btn-outline-dark position-absolute"
        style={{ top: 0, right: 0 }}
        onClick={onClose}
      >
        ✖
      </button>

      <div className="row">

        {products.map(product => (

          <div key={product.productId} className="col-md-4 mb-4">

            <ProductCard
              product={product}
              isWishlisted={
                wishlistItems.some(i => i.productId === product.productId)
              }
              onAddCart={onAddCart}
              onAddWishlist={onAddWishlist}
              onRemoveWishlist={onRemoveWishlist}
            />

          </div>

        ))}

      </div>

    </div>

  );

};

export default RecommendationSection;
