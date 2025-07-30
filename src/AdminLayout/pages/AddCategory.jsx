import { toast, ToastContainer } from "react-toastify";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";

import axios from "axios";

function AddCategory() {
  const [categoryData, setcategoryData] = useState({
    name: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setcategoryData({
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

    const { name } = formData;

    if (!name) {
      setErrorMessage("Please fill in all fields!");
      return;
    }

    Object.entries(categoryData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (imageFile) {
      formData.append("image", imageFile);
    }

    setErrorMessage("");

    try {
      await axios.post("http://localhost:3000/api/category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        toast.success("Category Added Successfully", {
          position: "top-right",
          autoClose: 3000,
        });
      }, 100);
      setcategoryData({
        name: "",
      });
      navigate("/admin/categories");
    } catch (error) {
      console.error("Error adding category:", error);
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
          Add New Category
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
            <Button variant="contained" component="span" sx={{ mt: 2, mb: 2 }}>
              Upload Image
            </Button>
          </label>
          <br />
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
}

export default AddCategory;
