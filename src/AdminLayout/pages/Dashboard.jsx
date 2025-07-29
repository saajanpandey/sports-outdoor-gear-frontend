import { Box, Paper, Typography } from '@mui/material';

const Dashboard = () => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(4, 1fr)',
      },
      gap: 2,
      p: 2,
    }}
  >
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">Total Products</Typography>
      <Typography variant="h4">10</Typography>
    </Paper>
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">Catagories</Typography>
      <Typography variant="h4">5</Typography>
    </Paper>
    {/* More cards here */}
  </Box>
);

export default Dashboard;
