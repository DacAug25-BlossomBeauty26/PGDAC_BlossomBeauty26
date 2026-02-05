
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { prod_url } from "./restenpoints";

import { fetchAllProductsAdmin } from "../store/productSlice";
import {
  fetchAllOrdersAdmin,
  updateOrderStatusAdmin,
} from "../store/orderSlice";
import { order_url } from "./restenpoints";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const { products, loading } = useSelector((state) => state.products);
  const { orders, status } = useSelector((state) => state.orders);

  const [editId, setEditId] = useState(null);

  const [productForm, setProductForm] = useState({
    productName: "",
    description: "",
    price: "",
    stock: "",
    brandId: "",
    subCategoryId: "",
    imageUrl: "",
  });

  useEffect(() => {
    dispatch(fetchAllProductsAdmin());
    dispatch(fetchAllOrdersAdmin());
  }, [dispatch]);

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  // add/update product
  const saveProduct = async () => {
    if (!productForm.brandId || !productForm.subCategoryId) {
      alert("Brand ID and SubCategory ID are required");
      return;
    }

    if (editId) {
      await axios.put(
        `${prod_url}/admin/updateproductbyid/${editId}`,
        productForm
      );
    } else {
      await axios.post(
        order_url+"/admin/addproduct",
        productForm
      );
    }

    resetForm();
    dispatch(fetchAllProductsAdmin());
  };

  const editProduct = (p) => {
    setEditId(p.productId);
    setProductForm({
      productName: p.productName,
      description: p.description,
      price: p.price,
      stock: p.stock,
      brandId: p.brand?.brandId,
      subCategoryId: p.subCategory?.subCategoryId,
      imageUrl: p.imageUrl,
    });
  };

  const deleteProduct = async (productId) => {
    await axios.delete(
      `${order_url}/admin/deleteproductbyid/${productId}`
    );
    dispatch(fetchAllProductsAdmin());
  };

  const resetForm = () => {
    setEditId(null);
    setProductForm({
      productName: "",
      description: "",
      price: "",
      stock: "",
      brandId: "",
      subCategoryId: "",
      imageUrl: "",
    });
  };

  const updateOrderStatus = (orderId, status) => {
    dispatch(updateOrderStatusAdmin({ orderId, status }));
  };

  // logout admn
  const handleLogout = () => {
   
    navigate("/"); 
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Admin Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* PRODUCTS */}
      <h4>Products Management</h4>

      <div className="row g-2 mb-3">
        <div className="col-md-2">
          <input
            name="productName"
            placeholder="Name"
            className="form-control"
            value={productForm.productName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <input
            name="price"
            placeholder="Price"
            className="form-control"
            value={productForm.price}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <input
            name="stock"
            placeholder="Stock"
            className="form-control"
            value={productForm.stock}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <input
            name="brandId"
            placeholder="Brand ID"
            className="form-control"
            value={productForm.brandId}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <input
            name="subCategoryId"
            placeholder="SubCat ID"
            className="form-control"
            value={productForm.subCategoryId}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-success w-100" onClick={saveProduct}>
            {editId ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table className="table table-bordered mb-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.productId}>
                <td>{p.productId}</td>
                <td>{p.productName}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>{p.status}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editProduct(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProduct(p.productId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/*  ORDERS*/}
      <h4>Orders Management</h4>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.orderId}>
              <td>{o.orderId}</td>
              <td>{o.userId}</td>
              <td>
                <select
                  value={o.status}
                  className="form-select"
                  onChange={(e) => updateOrderStatus(o.orderId, e.target.value)}
                >
                  <option >Select Status</option>
                  <option value="DISPATCHED">DISPATCHED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
