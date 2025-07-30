import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddBoxIcon from "@mui/icons-material/AddBox"; // Icon for Add Product
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const drawerWidth = 240;

const Sidebar = ({ userRole }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      (!userRole == "admin" || userRole == null) &&
      window.location.pathname.startsWith("/admin")
    ) {
      navigate("/login/admin");
    }
  }, [userRole, navigate]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          overflow: "visible",
          zIndex: (theme) => theme.zIndex.drawer,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            overflow: "visible",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/dashboard">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/products">
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/categories">
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItemButton>
            </ListItem>

            {/* ✅ Add Product */}
            {/* <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/AddProduct">
                <ListItemIcon>
                  <AddBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Add Product" />
              </ListItemButton>
            </ListItem> */}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
