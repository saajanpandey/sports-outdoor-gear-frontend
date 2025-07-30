import Sidebar from './components/sidebar';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom'; // for nested routing

const Layout = () => (
  <Box sx={{ display: 'flex', height: '100vh' }}>
    <Sidebar />
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: 'background.default',
        p: 3,
        overflow: 'auto',
      }}
    >
      {/* This is where pages render */}
      <Outlet /> 
    </Box>
  </Box>
);

export default Layout;
