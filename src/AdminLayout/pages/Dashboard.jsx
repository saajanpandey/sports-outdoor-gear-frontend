import { Box, Paper, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Dashboard = () => {
  const [productCount, setProductCount] = useState(null);
  const [categoryCount, setCategoryCount] = useState(null);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/product");
        const products = res.data;
        setProductCount(products.length);
      } catch (err) {
        setProductCount(0);
      }
    };

    const fetchCategoryCount = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/category");

        const categories = res.data;
        setCategoryCount(categories.length);
      } catch (err) {
        setCategoryCount(0);
      }
    };

    fetchProductCount();
    fetchCategoryCount();
  }, []);
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
          p: 2,
        }}
      >
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6">Total Products</Typography>
          <Typography variant="h4">{productCount}</Typography>
        </Paper>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6">Catagories</Typography>
          <Typography variant="h4">{categoryCount}</Typography>
        </Paper>
        {/* More cards here */}
      </Box>
    </>
  );
};

export default Dashboard;
