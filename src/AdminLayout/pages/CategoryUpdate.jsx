import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryUpdate = () => {
  const { id } = useParams(); // Get category ID from the URL

  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState({
    name: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const [loading, setLoading] = useState(true);

  // Fetch existing category data on mount
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/category/${id}`);
        setCategoryData({
          name: res.data.data.name,

        });
      } catch (error) {
        toast.error("Failed to fetch category data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    setCategoryData({
      ...categoryData,
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
    Object.entries(categoryData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.put(`http://localhost:3000/api/category/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

     

      // Optionally, navigate back to category list after update
      setTimeout(() => {
          toast.success("Category updated successfully!");
      }, 100);
      navigate("/admin/categories");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
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
          Update Category
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={categoryData.name}
            onChange={handleChange}
            required
            margin="normal"
          />

          <input
            accept="image/*"
            type="file"
            name="image"
            id="upload-image"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="upload-image">
            <Button
              variant="contained"
              component="span"
              sx={{ mt: 2, mb: 2 }}
              fullWidth
            >
              Upload New Image
            </Button>
          </label>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Update Category
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CategoryUpdate;
