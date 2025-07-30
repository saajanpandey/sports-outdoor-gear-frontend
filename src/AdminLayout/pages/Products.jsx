import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper,
  TableContainer,
  CircularProgress,
  Box,
} from "@mui/material";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { toast, ToastContainer } from "react-toastify";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/product");
      setProducts(res.data); // Adjust based on your backend response
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    navigate("/admin/AddProduct");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(`http://localhost:3000/api/product/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      setTimeout(() => {
        toast.success("Product Deleted Successfully", {
          position: "top-right",
          autoClose: 3000,
        });
      }, 100);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Products
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Description</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Price</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Category</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Brand</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((prod) => (
                  <TableRow key={prod._id}>
                    <TableCell>{prod.product_name}</TableCell>
                    <TableCell>{prod.product_description}</TableCell>
                    <TableCell>${prod.price}</TableCell>
                    <TableCell>
                      {prod.category?.name || prod.category}
                    </TableCell>
                    <TableCell>{prod.brand_name}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          navigate(`/admin/product/edit/${prod._id}`)
                        }
                        sx={{ mr: 1 }} // optional spacing between buttons
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(prod._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <SpeedDial
        ariaLabel="Add new product"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={handleClick}
        open={false} // prevent opening actions since you have none
      />
    </>
  );
};

export default AdminProducts;
