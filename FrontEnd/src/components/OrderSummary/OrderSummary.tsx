import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const OrderSummary = ({ subtotal, discounts, tax, delivery, total, savings }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, width: '300px', marginLeft: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Subtotal</Typography>
        <Typography>${subtotal.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Coupons/delivery fee adjustments/other discounts</Typography>
        <Typography color="error">-${discounts.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Sales tax</Typography>
        <Typography>${tax.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Delivery</Typography>
        <Typography>{delivery}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2, borderTop: '1px solid grey', pt: 1 }}>
        <Typography variant="subtitle1" gutterBottom>Total</Typography>
        <Typography variant="subtitle1" gutterBottom>${total.toFixed(2)}</Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'green', textAlign: 'center' }}>
        You are saving ${savings.toFixed(2)} on this order.
      </Typography>
    </Paper>
  );
};

export default OrderSummary;
