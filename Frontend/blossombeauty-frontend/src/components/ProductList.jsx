import ProductCard from "./ProductCard";

const ProductList = ({ products, wishlistItems, onAddCart, onAddWishlist, onRemoveWishlist }) => {

  return (
    <div className="container">

      <div className="row">

        {products.map(product => (

          <div className="col-md-4 mb-4" key={product.productId}>

            <ProductCard
              product={product}
              isWishlisted={wishlistItems.some(i => i.productId === product.productId)}
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

export default ProductList;
