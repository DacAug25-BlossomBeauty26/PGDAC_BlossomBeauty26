import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsAdmin } from "../store/productSlice";
import { prod_url } from "../components/restenpoints";

const ProductManagement = () => {

  const dispatch = useDispatch();
  const { products = [] } = useSelector(state => state.products);

  const [editId, setEditId] = useState(null);

  const [productForm, setProductForm] = useState({
    productName: "",
    price: "",
    stock: "",
    brandId: "",
    subCategoryId: ""
  });

  useEffect(() => {
    dispatch(fetchAllProductsAdmin());
  }, [dispatch]);

  const handleChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value
    });
  };

  const saveProduct = async () => {
    try {

      if (editId) {
        await axios.put(
          `${prod_url}/admin/updateproductbyid/${editId}`,
          productForm
        );
      } else {
        await axios.post(
          `${prod_url}/admin/addproduct`,
          productForm
        );
      }

      dispatch(fetchAllProductsAdmin());
      resetForm();

    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const editProduct = (product) => {
    setEditId(product.productId);

    setProductForm({
      productName: product.productName,
      price: product.price,
      stock: product.stock,
      brandId: product.brandId,
      subCategoryId: product.subCategoryId
    });
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `${prod_url}/admin/deleteproductbyid/${id}`
      );

      dispatch(fetchAllProductsAdmin());

    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setProductForm({
      productName: "",
      price: "",
      stock: "",
      brandId: "",
      subCategoryId: ""
    });
  };

  return (
    <div>

      <h4>Products Management</h4>

      {/* FORM SECTION */}
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
          <button
            className="btn btn-success w-100"
            onClick={saveProduct}
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

      </div>

      {/* TABLE SECTION */}
      <table className="table table-bordered">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
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

    </div>
  );
};

export default ProductManagement;
