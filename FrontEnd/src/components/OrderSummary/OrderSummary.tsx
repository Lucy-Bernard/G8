import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { CartItem } from '@/app/home/cart/page';




const calculateTax = (total: number): number => {
  const taxRate = 0.30;
  return total * taxRate;
};


const OrderSummary = () => {

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Replace '1' with the actual user ID you need to fetch
    fetch(`http://localhost:5165/api/cart/1`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        return response.json();
      })
      .then(setCartItems)
      .catch((error) => setError(error.message));
  }, []);
  // Function to calculate total price
  const calculateTotal = (items: CartItem[]) =>
    items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const handleQuantityChange = (cartItemId: number, newQuantity: number) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.cartItemId === cartItemId) {
        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };


  // Use the calculateTotal function to get the total amount
  const totalAmount = calculateTotal(cartItems);
  const taxAmount = calculateTax(totalAmount);
  const total = totalAmount + taxAmount;

  return (
    <Paper elevation={3} sx={{ p: 2, width: '300px', marginLeft: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Subtotal</Typography>
        <Typography>${totalAmount.toFixed(2)}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Sales tax</Typography>
        <Typography>${taxAmount.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Delivery</Typography>
        <Typography>FREE</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2, borderTop: '1px solid grey', pt: 1 }}>
        <Typography variant="subtitle1" gutterBottom>Total</Typography>
        <Typography variant="subtitle1" gutterBottom>${total.toFixed(2)}</Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'green', textAlign: 'center' }}>
        You are saving $12 with free delivery!
      </Typography>
    </Paper>
  );
};

export default OrderSummary;
