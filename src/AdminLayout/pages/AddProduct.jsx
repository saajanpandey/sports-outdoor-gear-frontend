import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
} from '@mui/material';
import axios from 'axios';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
  });

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/products', productData);
      alert('Product added successfully!');
      console.log(response.data);

      // Optional: Clear form
      setProductData({
        name: '',
        description: '',
        price: '',
        category: '',
        brand: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" mb={3}>
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={productData.name}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={productData.description}
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
        <TextField
          fullWidth
          label="Category"
          name="category"
          value={productData.category}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Brand"
          name="brand"
          value={productData.brand}
          onChange={handleChange}
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddProduct;
