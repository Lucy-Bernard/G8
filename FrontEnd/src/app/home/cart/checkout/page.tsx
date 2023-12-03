"use client";

// import * as React from 'react';
import OrderSummary from "@/components/OrderSummary/OrderSummary";
import ReviewOrder from "@/components/ReviewOrder/ReviewOrder";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import "@fontsource/quicksand"; // Defaults to weight 400
import "@fontsource/quicksand/400.css"; // Specify weight
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Snackbar, SnackbarContent } from '@mui/material';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { CartItem } from '@/app/home/cart/page';

// -----------Font -------------------------------------
const theme = createTheme({
  typography: {
    fontFamily: [
      'Quicksand',
      'sans-serif',
    ].join(','),
  },
});

// const stepHeight = '100px'; 
// -------------------Checkout------------------------------


const steps = ['Shipping', 'Payment', 'Review & Order'];

// type CartItem = {
//   cartItemId: number;
//   productId: number;
//   quantity: number;
//   productName: string;
//   unitPrice: number;
//   manufacturer: string;
//   description: string;
//   rating: number;
//   sku: string;
//   imageLink: string;
// };

export default function Checkout() {

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



  const [formError, setFormError] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [orderSubmitted, setOrderSubmitted] = React.useState(false);
  const router = useRouter();

  //---------------Order Summary------------------------
  // const [totalCost, setTotalCost] = useState<number>(0);
  // useEffect(() => {
  //   // Check if the router is ready and has query parameters
  //   if (router.isReady) {
  //     const totalQueryParam = router.query.total as string;
  //     if (totalQueryParam) {
  //       setTotalCost(parseFloat(totalQueryParam));
  //     }
  //   }
  // }, [router.isReady, router.query]);



  // ---------------Shipping Input----------------------------
  const [activeStep, setActiveStep] = React.useState(0);

  const [shipping, setShipping] = React.useState<ShippingState>({
    firstName: '',
    lastName: '',
    address: '',
    apt: '',
    city: '',
    state: '',
    postalCode: ''
  });

  type ShippingState = {
    firstName: string;
    lastName: string;
    address: string;
    apt: string;
    city: string;
    state: string;
    postalCode: string;
  }

  // ---------------Payment Input-------------------------

  const [payment, setPayment] = React.useState<PaymentState>({
    cardNumber: '',
    securityCode: '',
    expirationMonth: '',
    expirationYear: ''
  });

  type PaymentState = {
    cardNumber: string;
    securityCode: string;
    expirationMonth: string;
    expirationYear: string;

  }
  // -----------------Validation-----------------------------
  const validateShipping = () => {
    return shipping.firstName && shipping.lastName && shipping.address && shipping.postalCode;
  };

  const validatePayment = () => {
    return payment.cardNumber && payment.securityCode && payment.expirationMonth && payment.expirationYear;
  };

  // ----------------------Next/Back/Home Buttons ------------
  const handleNext = () => {
    // prevent from proceeding to next step if shipping fields not filled out
    if (activeStep === 0 && !validateShipping()) {
      setFormError(true);
      return;
    }
    // prevent from proceeding to next step if payment fields not filled out
    if (activeStep === 1 && !validatePayment()) {
      setFormError(true);
      return;
    }
    setFormError(false); // Reset error state if validation passes
    // handle order submmission
    if (activeStep === steps.length - 1) {
      setOrderSubmitted(true);
      setOpenSnackbar(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

  };

  // function to handle Snackbar close
  const handleCloseSnackbar = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleGoHome = () => {
    router.push('/home');
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>


      {/* Steps and Forms */}
      {/*outter box */}
      <Box className={styles.content}>
        <Box>


          <Stepper activeStep={activeStep}>
            <Step key="Shipping">
              <StepLabel>Shipping</StepLabel>
            </Step>
            <Step key="Payment">
              <StepLabel>Payment</StepLabel>
            </Step>
            <Step key="Review & Order">
              <StepLabel>Review & Order</StepLabel>
            </Step>
          </Stepper>

          {/* -------------------------------------------Shipping Form --------------------------------------------*/}
          {activeStep === 0 && (
            <Box component="form" noValidate autoComplete="off" sx={{ mt: 2, maxWidth: '600px' }}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First Name "
                variant="outlined"
                margin="normal"
                value={shipping.firstName}
                sx={{ width: '48%', marginRight: '13px' }}
                error={formError && !shipping.firstName}
                helperText={formError && !shipping.firstName ? "first name is required" : ""}
                onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
              />

              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last Name "
                sx={{ width: '48%' }}
                variant="outlined"
                margin="normal"
                value={shipping.lastName}
                error={formError && !shipping.lastName}
                helperText={formError && !shipping.lastName ? "last name is required" : ""}
                onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
              />

              <TextField
                required
                id="address"
                name="address"
                label="Address "
                variant="outlined"
                margin="normal"
                sx={{ width: '98%' }}
                value={shipping.address}
                error={formError && !shipping.address}
                helperText={formError && !shipping.address ? "address is required" : ""}
                onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
              />

              <TextField
                name="apt"
                label="Apt, Suite, Floor (optional)"
                variant="filled"
                margin="normal"
                sx={{ width: '98%' }}
                value={shipping.apt}
                onChange={(e) => setShipping({ ...shipping, apt: e.target.value })}
              />
              <TextField
                required
                id="city"
                name="city"
                label="City "
                variant="outlined"
                margin="normal"
                sx={{ width: '30%', marginRight: '13px' }}
                value={shipping.city}
                error={formError && !shipping.city}
                helperText={formError && !shipping.city ? " city is required" : ""}
                onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
              />
              <TextField
                required
                id="state"
                name="state"
                label="State"
                variant="outlined"
                margin="normal"
                sx={{ width: '30%', marginRight: '13px' }}
                value={shipping.state}
                error={formError && !shipping.state}
                helperText={formError && !shipping.state ? " state is required" : ""}
                onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
              />

              <TextField
                required
                id="postalCode"
                name="postalCode"
                label="Postal Code "
                variant="outlined"
                margin="normal"
                sx={{ width: '34%' }}
                value={shipping.postalCode}
                error={formError && !shipping.postalCode}
                helperText={formError && !shipping.postalCode ? " postal code is required" : ""}
                onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
              />

            </Box >
          )
          }

          {/* ------------------------------------------------Payment Form ------------------------------------------------*/}
          {
            activeStep === 1 && (
              <Box component="form" noValidate autoComplete="off" sx={{ mt: 2, maxWidth: '600px' }}>

                <TextField
                  required
                  id="cardNumber"
                  name="cardNumber"
                  label="Credit Card Number"
                  sx={{ width: '70%', marginRight: '13px' }}
                  variant="outlined"
                  margin="normal"
                  value={payment.cardNumber}
                  error={formError && !payment.cardNumber}
                  onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                  helperText={formError && !payment.cardNumber ? "card number is required 16-digits" : ""}
                  inputProps={{
                    maxLength: 16,
                    minLength: 16
                  }}
                />

                <TextField
                  required
                  id="securityCode"
                  name="securityCode"
                  label="CVV"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  sx={{ width: '27%' }}
                  value={payment.securityCode}
                  error={formError && !payment.securityCode}
                  helperText={formError && !payment.securityCode ? "cvv is required" : ""}
                  onChange={(e) => setPayment({ ...payment, securityCode: e.target.value })}
                  inputProps={{ maxLength: 3 }} // limit input to 3 characters
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="The 3-digit code on the back of your card">
                          <InfoIcon fontSize="small" sx={{ color: '#1976d2' }} />
                        </Tooltip>
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  required
                  id="expirationMonth"
                  name="expirationMonth"
                  label="MM"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  sx={{ width: '14%', marginRight: '13px' }}
                  value={payment.expirationMonth}
                  error={formError && !payment.expirationMonth}
                  helperText={formError && !payment.expirationMonth ? "exp month is required" : ""}
                  onChange={(e) => setPayment({ ...payment, expirationMonth: e.target.value })}
                  inputProps={{ maxLength: 2 }} // limit input to 2 characters
                />

                <TextField
                  required
                  id="expirationYear"
                  name="expirationYear"
                  label="YY"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  sx={{ width: '14%' }}
                  value={payment.expirationYear}
                  error={formError && !payment.expirationYear}
                  helperText={formError && !payment.expirationYear ? "exp year is required" : ""}
                  onChange={(e) => setPayment({ ...payment, expirationYear: e.target.value })}
                  inputProps={{ maxLength: 2 }} // Limit input to 2 characters
                />

                <Typography variant="subtitle2" gutterBottom sx={{ color: '#6f6f6f', textAlign: 'left' }}>
                  Expiration Date
                </Typography>

              </Box>
            )
          }
          {/*----------------------------Review Order------------------------------------*/}
          {activeStep === 2 && (
            // <Box sx={{ mt: 2, maxWidth: '900px' }}>

            <ReviewOrder
              shippingDetails={shipping}
              paymentDetails={{
                cardNumber: payment.cardNumber.replace(/.(?=.{4})/g, 'x'), // Mask all but last 4 digits
                expirationMonth: payment.expirationMonth,
                expirationYear: payment.expirationYear
              }}
            />
            // </Box>
          )}

          {/*-------------------------------- Navigation Buttons --------------------------*/}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0 || orderSubmitted}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>

            {orderSubmitted ? (
              <Button onClick={handleGoHome}>
                Home
              </Button>
            ) : (
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Submit Order' : 'Next'}
              </Button>
            )}
          </Box >
        </Box>
        <Box sx={{ marginTop: '-100px' }}>
          {/* Order Summary */}
          <OrderSummary
            // subtotal={totalCost}
            subtotal={calculateTotal(cartItems)}
            tax={0.00}
            total={407.87}

          />
        </Box>
      </Box>
      {/* Snackbar notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <SnackbarContent
          message="Order confirmed! You will receive a confirmation email."
          style={{ backgroundColor: 'green' }} // Snackbar with green background
        />
      </Snackbar>
    </ThemeProvider >

  );
};
