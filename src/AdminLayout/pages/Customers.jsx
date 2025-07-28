// src/pages/Customers.jsx
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box } from '@mui/material';

const customers = [
  { id: 1, name: 'Alex Morgan', email: 'alex@example.com', orders: 5 },
  { id: 2, name: 'Chris Evans', email: 'chris@example.com', orders: 3 },
  { id: 3, name: 'Taylor Swift', email: 'taylor@example.com', orders: 7 },
];

const Customers = () => {
  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>Customers</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Total Orders</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.orders}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Customers;
