// src/components/Navbar.jsx
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    window.location.href = "/login/admin";
    toast.success("Admin logout successful!", {
              position: "top-right",
              autoClose: 3000,
            });
  };
  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#1976d2", zIndex: 1201 }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Sports Gear Admin
          </Typography>
          <Box>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            <Button
              variant="contained"
              endIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
