import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, addToCart } from "../store/cartSlice";
import { fetchWishlist, addWishlistItem, removeWishlistItem } from "../store/wishlistSlice";
import { prod_url } from "../components/restenpoints";

import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import ProductList from "../components/ProductList";
import RecommendationSection from "../components/RecommendationSection";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import ConcernModal from "../components/ConcernModal";

const Home = () => {

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user?.userInfo ?? {});
  const wishlistItems = useSelector((state) => state.wishlist?.items ?? []);

  const [products, setProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);

  const [showConcernModal, setShowConcernModal] = useState(false);
  const [selectedConcerns, setSelectedConcerns] = useState([]);

  const [successMessage, setSuccessMessage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  // FETCH PRODUCTS
  useEffect(() => {
    axios.get(prod_url + "/getallactiveproducts")
      .then(res => setProducts(res.data || []))
      .catch(err => console.error(err));
  }, []);

  // FETCH CART & WISHLIST
  useEffect(() => {
    if (userInfo?.userId) {
      dispatch(fetchCart(userInfo.userId));
      dispatch(fetchWishlist(userInfo.userId));
    }
  }, [userInfo]);

  // AUTO ADD AFTER LOGIN
  useEffect(() => {
    if (userInfo?.userId && pendingProduct) {
      handleAddToCart(pendingProduct);
      setPendingProduct(null);
      setShowModal(false);
    }
  }, [userInfo]);

  // SHOW CONCERN MODAL
  useEffect(() => {
    if (userInfo?.userId && recommendedProducts.length === 0) {
      setShowConcernModal(true);
    }
  }, [userInfo]);

  const handleAddToCart = (product) => {

    if (!userInfo?.userId) {
      setPendingProduct(product);
      setShowModal(true);
      return;
    }

    dispatch(addToCart({
      userId: userInfo.userId,
      productId: product.productId,
      productName: product.productName,
      price: product.price.toString()
    }))
    .unwrap()
    .then(() => {
      setSuccessMessage(`${product.productName} added to cart`);
      setTimeout(() => setSuccessMessage(""), 2500);
      dispatch(fetchCart(userInfo.userId));
    });
  };

  const handleAddWishlist = (product) => {

    if (!userInfo?.userId) {
      setPendingProduct(product);
      setShowModal(true);
      return;
    }

    dispatch(addWishlistItem({
      userId: userInfo.userId,
      productId: product.productId
    }));
  };

  const handleRemoveWishlist = (product) => {

    dispatch(removeWishlistItem({
      userId: userInfo.userId,
      productId: product.productId
    }));
  };

  const generateRecommendations = () => {

    const matched = products.filter(product => {

      const text = `${product.productName} ${product.description}`.toLowerCase();

      return selectedConcerns.some(c => text.includes(c));

    });

    setRecommendedProducts(matched);
    setShowRecommendation(true);
    setShowConcernModal(false);
  };

  const filteredProducts = products.filter(p =>
    p.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {successMessage && (
        <div className="success">{successMessage}</div>
      )}

      <Carousel />

      <RecommendationSection
        showRecommendation={showRecommendation}
        products={recommendedProducts}
        wishlistItems={wishlistItems}
        onAddCart={handleAddToCart}
        onAddWishlist={handleAddWishlist}
        onRemoveWishlist={handleRemoveWishlist}
        onClose={() => setShowRecommendation(false)}
      />

      <ProductList
        products={filteredProducts}
        wishlistItems={wishlistItems}
        onAddCart={handleAddToCart}
        onAddWishlist={handleAddWishlist}
        onRemoveWishlist={handleRemoveWishlist}
      />

      <Footer />

      <LoginModal
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <ConcernModal
        show={showConcernModal}
        selectedConcerns={selectedConcerns}
        setSelectedConcerns={setSelectedConcerns}
        generateRecommendations={generateRecommendations}
        onClose={() => setShowConcernModal(false)}
      />
    </>
  );
};

export default Home;
