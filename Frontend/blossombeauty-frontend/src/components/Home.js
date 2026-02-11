import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addToCart, fetchCart } from "../store/cartSlice";
import { logout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import Wishlist from "./Wishlist";

// Carousel images
import img1 from "../assets/images/1.webp";
import img2 from "../assets/images/2.webp";
import img3 from "../assets/images/3.webp";
import img4 from "../assets/images/4.webp";
import img5 from "../assets/images/5.webp";
import img6 from "../assets/images/6.webp";
import img7 from "../assets/images/7.webp";
import img8 from "../assets/images/8.webp";
import img9 from "../assets/images/9.webp";
import img10 from "../assets/images/10.webp";
import img11 from "../assets/images/11.webp";
import { prod_url } from "./restenpoints";
import { fetchWishlist, addWishlistItem, removeWishlistItem } from "../store/wishlistSlice";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [products, setProducts] = useState([]);
  const [pendingProduct, setPendingProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConcernModal, setShowConcernModal] = useState(false);
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // REDUX
  const userInfo = useSelector((state) => state.user?.userInfo ?? {});
  const cartItems = useSelector((state) => state.cart?.items ?? []);
  const wishlistItems = useSelector((state) => state.wishlist?.items ?? []);

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];

  // CAROUSEL
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // FETCH PRODUCTS
  useEffect(() => {
    axios
      .get(prod_url + "/getallactiveproducts") // API GATEWAY
      .then((res) => setProducts(res.data || []))
      .catch((err) => console.error("Product fetch error", err));
  }, []);

  // FETCH CART & WISHLIST AFTER LOGIN
  useEffect(() => {
    if (userInfo?.userId) {
      dispatch(fetchCart(userInfo.userId));
      dispatch(fetchWishlist(userInfo.userId));
    }
  }, [userInfo, dispatch]);

  // AUTO ADD AFTER LOGIN
  useEffect(() => {
    if (userInfo?.userId && pendingProduct) {
      handleAddToCart(pendingProduct);
      setPendingProduct(null);
      setShowModal(false);
      setShowConcernModal(false);
    }
  }, [userInfo, pendingProduct]);

  // ADD TO CART
  const handleAddToCart = (product) => {
    if (!userInfo?.userId) {
      setPendingProduct(product);
      setIsLogin(true);
      setShowModal(true);
      return;
    }

    dispatch(
      addToCart({
        userId: userInfo.userId,
        productId: product.productId,
        productName: product.productName,
        price: product.price.toString(),
      })
    )
      .unwrap()
      .then(() => {
        setSuccessMessage(`✅ ${product.productName} added to cart`);
        setTimeout(() => setSuccessMessage(""), 2500);
        dispatch(fetchCart(userInfo.userId));
      });
  };

  // ADD TO WISHLIST
  const handleAddToWishlist = (product) => {
    if (!userInfo?.userId) {
      setPendingProduct(product);
      setIsLogin(true);
      setShowModal(true);
      return;
    }

    const exists = wishlistItems.some((item) => item.productId === product.productId);
    if (exists) return;

    dispatch(addWishlistItem({ userId: userInfo.userId, productId: product.productId }))
      .unwrap()
      .then(() => {
        setSuccessMessage(`💖 ${product.productName} added to wishlist`);
        setTimeout(() => setSuccessMessage(""), 2500);
      });
  };

  const handleRemoveFromWishlist = (product) => {
    dispatch(removeWishlistItem({ userId: userInfo.userId, productId: product.productId }))
      .unwrap()
      .then(() => {
        setSuccessMessage(`❌ ${product.productName} removed from wishlist`);
        setTimeout(() => setSuccessMessage(""), 2500);
      });
  };

  // CLOSE PROFILE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-dropdown")) setShowProfile(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // SEARCH FILTER
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Concern list
  const concerns = [
    { label: "Acne", value: "acne" },
    { label: "Dandruff", value: "dandruff" },
    { label: "Hair Fall", value: "hair fall" },
    { label: "Dry Skin", value: "dry" },
    { label: "Pigmentation", value: "pigment" },
  ];

  // Show concern popup after login
  useEffect(() => {
    if (userInfo?.userId && recommendedProducts.length === 0) {
      setShowConcernModal(true);
    }
  }, [userInfo]);

  // Checkbox handler
  const handleConcernChange = (value) => {
    setSelectedConcerns((prev) =>
      prev.includes(value)
        ? prev.filter((c) => c !== value)
        : [...prev, value]
    );
  };

  // Recommendation logic
  const generateRecommendations = () => {
    const matched = products.filter((product) => {
      const text = `${product.productName} ${product.description}`.toLowerCase();
      return selectedConcerns.some((c) => text.includes(c));
    });

    setRecommendedProducts(matched);
    setShowRecommendation(true);
    setShowConcernModal(false);
  };

  // NAVBAR + RENDER
  return (
    <>
      <nav className="navbar navbar-expand-lg px-5" style={{ backgroundColor: "#e6f7f7" }}>
        <span
          className="navbar-brand fw-bold fs-4"
          style={{ cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Blossom Beauty
        </span>

        <div className="ms-auto d-flex gap-3 align-items-center position-relative">
          <a className="nav-link" href="#home">Home</a>
          <a className="nav-link" href="#products">Products</a>
          <a className="nav-link" href="#contact">Contact</a>

          {/* SEARCH BAR */}
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="Search products..."
            style={{ width: "220px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {userInfo?.userId ? (
            <>
              {/* CART */}
              <button
                className="btn btn-outline-dark rounded-pill position-relative"
                onClick={() => navigate("/cart")}
              >
                🛒 Cart
                {cartItems.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems.length}
                  </span>
                )}
              </button>

              {/* WISHLIST */}
              <button
                className="btn btn-outline-danger rounded-pill ms-2"
                onClick={() => navigate("/wishlist")}
              >
                💖 Wishlist ({wishlistItems.length})
              </button>

              {/* PROFILE */}
              <div className="dropdown profile-dropdown">
                <button
                  className="btn btn-outline-dark rounded-circle ms-2"
                  style={{ width: 45, height: 45 }}
                  onClick={() => setShowProfile(!showProfile)}
                >
                  👤
                </button>

                {showProfile && (
                  <div
                    className="position-absolute bg-white shadow rounded p-3 d-flex flex-column gap-2"
                    style={{ right: 0, top: "55px", width: "250px", zIndex: 1000 }}
                  >
                    <strong>{userInfo.firstName} {userInfo.lastName}</strong>
                    <small>{userInfo.email}</small>

                    <button
                      className="btn btn-sm"
                      style={{ backgroundColor: "#cceeee" }}
                      onClick={() => {
                        setShowProfile(false);
                        navigate("/my-orders");
                      }}
                    >
                      📦 My Orders
                    </button>

                    <button
                      className="btn btn-sm"
                      style={{ backgroundColor: "#99e0e0" }}
                      onClick={() => {
                        dispatch(logout());
                        setShowProfile(false);
                        navigate("/");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              className="btn btn-outline-dark rounded-pill"
              onClick={() => setShowModal(true)}
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* SUCCESS MESSAGE */}
      {successMessage && (
        <div className="position-fixed top-0 start-50 translate-middle-x mt-3 px-3 py-2 bg-success text-white rounded shadow">
          {successMessage}
        </div>
      )}

      {/* CAROUSEL */}
      <div
        id="home"
        className="position-relative mt-3 mx-auto"
        style={{ height: "600px", maxWidth: "1200px" }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt=""
            className="position-absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "100%",
              maxHeight: "100%",
              opacity: idx === currentImage ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          />
        ))}
      </div>

      {/* RECOMMENDED PRODUCTS */}
      {showRecommendation && recommendedProducts.length > 0 && (
        <div className="container my-5 position-relative">
          <h3 className="text-center mb-4">🌟 Recommended for You</h3>
          <button
            className="btn btn-sm btn-outline-dark position-absolute"
            style={{ top: 0, right: 0 }}
            onClick={() => setShowRecommendation(false)}
          >
            ✖
          </button>
          <div className="row">
            {recommendedProducts.map((product) => (
              <div key={product.productId} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm border-success">
                  <img
                    src={product.imageUrl}
                    className="card-img-top"
                    alt={product.productName}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5>{product.productName}</h5>
                    <p>₹{product.price}</p>
                    <button
                      className="btn btn-outline-dark mt-auto"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                    {wishlistItems.some((item) => item.productId === product.productId) ? (
                      <button
                        className="btn btn-outline-secondary mt-2"
                        onClick={() => handleRemoveFromWishlist(product)}
                      >
                        ❌ Remove from Wishlist
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-danger mt-2"
                        onClick={() => handleAddToWishlist(product)}
                      >
                        💖 Add to Wishlist
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCTS */}
      <div className="container my-5" id="products">
        <h2 className="text-center mb-4">Our Products</h2>

        {filteredProducts.length === 0 && (
          <p className="text-center text-muted">No products found</p>
        )}

        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.productId} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.productName}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5>{product.productName}</h5>
                  <p>₹{product.price}</p>
                  <p style={{ color: "#31bedb", marginBottom: "5px" ,fontSize: "25px"}}>
                    ★★★★☆
                  </p>
                  <button
                    className="btn btn-outline-dark mt-auto"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  {wishlistItems.some((item) => item.productId === product.productId) ? (
                    <button
                      className="btn btn-outline-secondary mt-2"
                      onClick={() => handleRemoveFromWishlist(product)}
                    >
                      ❌ Remove from Wishlist
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-danger mt-2"
                      onClick={() => handleAddToWishlist(product)}
                    >
                      💖 Add to Wishlist
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer
        id="contact"
        className="text-center py-5"
        style={{ backgroundColor: "#e6f7f7" }}
      >
        <h4 className="mb-3">Contact Us</h4>
        <p className="mb-1">📍 Pune, Maharashtra, India</p>
        <p className="mb-1">📧 support@blossombeauty.com</p>
        <p className="mb-1">📞 +91 8475123690</p>
        <hr style={{ width: "60%", margin: "20px auto" }} />
        <p className="mb-0 text-muted">
          © {new Date().getFullYear()} Blossom Beauty. All rights reserved.
        </p>
      </footer>

      {/* LOGIN MODAL */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
          <div className="bg-white p-4 rounded shadow position-relative" style={{ width: "420px" }}>
            <button
              className="btn-close position-absolute top-0 end-0 m-3"
              onClick={() => setShowModal(false)}
            />
            {isLogin ? <LoginForm /> : <RegistrationForm />}
            <p className="text-center mt-3">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span
                className="fw-bold ms-1"
                style={{ cursor: "pointer" }}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Register" : "Login"}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* CONCERN MODAL */}
      {showConcernModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
          <div className="bg-white p-4 rounded shadow position-relative" style={{ width: "420px" }}>
            <h5 className="mb-3">Tell us your concerns 💖</h5>

            <button
              className="btn btn-sm btn-outline-dark position-absolute"
              style={{ top: 5, right: 5 }}
              onClick={() => setShowConcernModal(false)}
            >
              ✖
            </button>

            {concerns.map((c) => (
              <div key={c.value} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={selectedConcerns.includes(c.value)}
                  onChange={() => handleConcernChange(c.value)}
                />
                <label className="form-check-label">{c.label}</label>
              </div>
            ))}

            <button
              className="btn btn-dark w-100 mt-3"
              disabled={selectedConcerns.length === 0}
              onClick={generateRecommendations}
            >
              Show Recommendations
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
