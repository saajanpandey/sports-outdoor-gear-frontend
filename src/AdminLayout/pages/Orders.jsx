// src/pages/Orders.jsx
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box, Chip } from '@mui/material';

const orders = [
  { id: 101, customer: 'Alex Morgan', date: '2025-07-20', total: 120.99, status: 'Shipped' },
  { id: 102, customer: 'Chris Evans', date: '2025-07-19', total: 89.50, status: 'Processing' },
  { id: 103, customer: 'Taylor Swift', date: '2025-07-18', total: 150.00, status: 'Delivered' },
];

const statusColor = {
  'Processing': 'warning',
  'Shipped': 'info',
  'Delivered': 'success',
};

const Orders = () => {
  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>Orders</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total ($)</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip label={order.status} color={statusColor[order.status]} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Orders;
