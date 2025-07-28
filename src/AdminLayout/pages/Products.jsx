import { Typography, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const sampleProducts = [
  { id: 1, name: 'Football', price: 29.99 },
  { id: 2, name: 'Basketball', price: 34.99 },
];

const Products = () => {
  return (
    <>
      <Typography variant="h4" m={2}>Products</Typography>
      <Button variant="contained" color="primary" sx={{ m: 2 }}>Add New Product</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell><TableCell>Name</TableCell><TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Products;
