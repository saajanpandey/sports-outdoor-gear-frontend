import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

const AddProduct = () => {
  const [productData, setProductData] = useState({
    product_name: "",
    product_description: "",
    price: "",
    category: "",
    brand_name: "",
    is_featured: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // State to hold categories fetched from API
  const [categories, setCategories] = useState([]);

  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/category");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

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

    const {
      product_name,
      product_description,
      price,
      category,
      brand_name,
      is_featured,
    } = formData;

    if (
      !product_name ||
      !product_description ||
      !price ||
      !category ||
      !brand_name ||
      !is_featured
    ) {
      setErrorMessage("Please fill in all fields!");
      return;
    }

    if (price <= 0) {
      setErrorMessage("Price should be greater than zero.");
      return;
    }

    const pricePattern = /^\d+(\.\d{1,2})?$/;
    if (!pricePattern.test(price)) {
      setErrorMessage(
        "Price should contain numbers and decimal up to 2 decimal places."
      );
      return;
    }

    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.post("http://localhost:3000/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        toast.success("Product Added Successfully", {
          position: "top-right",
          autoClose: 3000,
        });
      }, 100);

      setProductData({
        product_name: "",
        product_description: "",
        price: "",
        category: "",
        brand_name: "",
      });
      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
      setTimeout(() => {
        toast.error("Something Went Wrong!", {
          position: "top-right",
          autoClose: 3000,
        });
      }, 100);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Paper elevation={12} sx={{ p: 4, width: "100%" }}>
        <Typography variant="h4" mb={3}>
          Add New Product
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
            required
            margin="normal"
          />

          {/* Category dropdown dynamically loaded from API */}
          <TextField
            fullWidth
            select
            label="Category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
            margin="normal"
            // Disabled while categories are loading (optional)
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
              Upload Image
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
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddProduct;
