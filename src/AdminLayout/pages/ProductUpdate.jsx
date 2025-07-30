import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

import axios from "axios";

const ProductUpdate = () => {
  const { id } = useParams(); // get product ID from URL
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    product_name: "",
    product_description: "",
    price: "",
    category: "",
    brand_name: "",
    is_featured: "", // default "No"
  });

  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch categories and product data on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/category");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/product/${id}`);
        const product = res.data.data;

        setProductData({
          product_name: product.product_name || "",
          product_description: product.product_description || "",
          price: product.price || "",
          category: product.category?._id || product.category || "",
          brand_name: product.brand_name || "",
          is_featured:
            product.is_featured !== undefined
              ? String(product.is_featured)
              : "0",
        });
      } catch (error) {
        toast.error("Failed to fetch product data");
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value);
    });


    if (
      productData.product_name == "" ||
      productData.product_description == "" ||
      productData.price == "" ||
      productData.category == "" ||
      productData.brand_name == "" ||
      productData.is_featured == ""
    ) {
      setErrorMessage("Please fill in all fields!");
      return;
    }

    if (productData.price <= 0) {
      setErrorMessage("Price should be greater than zero.");
      return;
    }
    const pricePattern = /^\d+(\.\d{1,2})?$/;
    if (!pricePattern.test(productData.price)) {
      setErrorMessage(
        "Price should contain numbers and decimal up to 2 decimal places."
      );
      return;
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    setErrorMessage("");

    try {
      await axios.put(`http://localhost:3000/api/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        toast.success("Product updated successfully!");
      }, 100);

      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <ToastContainer />
      <Paper elevation={12} sx={{ p: 4, width: "100%" }}>
        <Typography variant="h4" mb={3}>
          Update Product
        </Typography>

        {errorMessage && (
          <div
            className="error-message"
            style={{ color: "red", marginBottom: "8px" }}
          >
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="product_name"
            value={productData.product_name}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="product_description"
            value={productData.product_description}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={productData.price}
            onChange={handleChange}
            
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
            margin="normal"
            disabled={categories.length === 0}
          >
            {categories.length > 0 ? (
              categories.map((cat) => (
                <MenuItem key={cat._id || cat.id} value={cat._id || cat.id}>
                  {cat.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">Loading categories...</MenuItem>
            )}
          </TextField>

          <TextField
            fullWidth
            select
            label="Featured"
            name="is_featured"
            value={productData.is_featured}
            onChange={handleChange}
            required
            margin="normal"
          >
            <MenuItem value="1">Yes</MenuItem>
            <MenuItem value="0">No</MenuItem>
          </TextField>

          <input
            accept="image/*"
            type="file"
            name="image"
            id="upload-image"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="upload-image">
            <Button variant="contained" component="span" sx={{ mt: 2, mb: 2 }}>
              Upload New Image
            </Button>
          </label>

          <TextField
            fullWidth
            label="Brand Name"
            name="brand_name"
            value={productData.brand_name}
            onChange={handleChange}
            required
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Update Product
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ProductUpdate;
