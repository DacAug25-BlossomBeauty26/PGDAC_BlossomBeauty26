import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";


const Navbar = ({ searchTerm, setSearchTerm }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user?.userInfo ?? {});
  const cartItems = useSelector((state) => state.cart?.items ?? []);
  const wishlistItems = useSelector((state) => state.wishlist?.items ?? []);
  const [showModal, setShowModal] = useState(false);


  const [showProfile, setShowProfile] = useState(false);

  // CLOSE PROFILE ON OUTSIDE CLICK
  useEffect(() => {

    const handleClickOutside = (e) => {

      if (!e.target.closest(".profile-dropdown")) {

        setShowProfile(false);

      }

    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);

  }, []);

  return (

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

        {/* SEARCH */}
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

                  <strong>
                    {userInfo.firstName} {userInfo.lastName}
                  </strong>

                  <small>{userInfo.email}</small>

                  <button
                    className="btn btn-sm"
                    style={{ backgroundColor: "#cceeee" }}
                    onClick={() => navigate("/my-orders")}
                  >
                    📦 My Orders
                  </button>

                  <button
                    className="btn btn-sm"
                    style={{ backgroundColor: "#99e0e0" }}
                    onClick={() => {

                      dispatch(logout());

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
<LoginModal
  showModal={showModal}
  setShowModal={setShowModal}
/>

    </nav>
    

  );

};

export default Navbar;
