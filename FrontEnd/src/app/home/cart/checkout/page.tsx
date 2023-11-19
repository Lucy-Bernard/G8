"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import "@fontsource/quicksand"; // Defaults to weight 400
import "@fontsource/quicksand/400.css"; // Specify weight
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OrderSummary from "@/components/OrderSummary/OrderSummary";
import { Snackbar, SnackbarContent } from '@mui/material';
import { useRouter } from 'next/navigation';

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


export default function Checkout() {

  const [formError, setFormError] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false); 
  const [orderSubmitted, setOrderSubmitted] = React.useState(false); 
  const router = useRouter();

// ---------------Shipping Input-----------------------
  const [activeStep, setActiveStep] = React.useState(0);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [apt, setApt] = React.useState('');
  const [postalCode, setPostalCode] = React.useState('');

// ---------------Payment Input-----------------------
  const [cardNumber, setCardNumber] = React.useState('');
  const [securityCode, setSecurityCode] = React.useState('');
  const [expirationMonth, setExpirationMonth] = React.useState('');
  const [expirationYear, setExpirationYear] = React.useState('');
  
// -----------------Validation-----------------------------
  const validateShipping = () => {
    return firstName && lastName && address && postalCode;
  };
  
  const validatePayment = () => {
    return cardNumber && securityCode && expirationMonth && expirationYear;
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

  const handleReset = () => {
    setActiveStep(0);
    setFirstName('');
    setLastName('');
    setAddress('');
    setPostalCode('');
    setApt('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} justifyContent="center" alignItems="flex-start">


        {/* Steps and Forms */}
        <Grid item xs={12} md={7}>
          <Box sx={{ padding: '40px', marginLeft:'-50px', maxWidth:700 }}>
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
{/* -------------------------------------------Shipping Form --------------------------------------------*/}
            {activeStep === 0 && (
              <Box component="form" noValidate autoComplete="off" sx={{ mt: 2, maxWidth:700 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="firstName"
                      name="firstName"
                      label="First Name "
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      value={firstName}
                      error={formError && !firstName}
                      helperText={formError && !firstName ? "first name is required" : ""}
                      onChange={(e) => setFirstName(e.target.value)}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="lastName"
                      name="lastName"
                      label="Last Name "
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      value={lastName}
                      error={formError && !lastName}
                      helperText={formError && !lastName ? "last name is required" : ""}
                      onChange={(e) => setLastName(e.target.value)}
                      />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="address"
                      name="address"
                      label="Address "
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      value={address}
                      error={formError && !address}
                      helperText={formError && !address ? "address is required" : ""}
                      onChange={(e) => setAddress(e.target.value)}                 
                      />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="apt"
                      label="Apt, Suite, Floor (optional)"
                      fullWidth
                      variant="filled"
                      margin="normal"
                      value={apt}
                      onChange={(e) => setApt(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="postalCode"
                      name="postalCode"
                      label="Postal Code "
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      value={postalCode}
                      error={formError && !postalCode}
                      helperText={formError && !postalCode ? " postal code is required" : ""}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

{/* ------------------------------------------------Payment Form ------------------------------------------------*/}
            {activeStep === 1 && (
              <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={8} sm ={8}>
                    <TextField
                      required
                      id="cardNumber"
                      name="cardNumber"
                      label="Credit Card Number"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      value={cardNumber}
                      error={formError && !cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9]/g, ''))}
                      helperText={formError && !cardNumber ? "card number is required 16-digits" : ""}
                      inputProps={{ 
                        maxLength: 16,
                        minLength: 16 
                      }}
                      />
                  </Grid>
                  <Grid item xs={3} sm={3}>
                  <TextField
                    required
                    id="securityCode"
                    name="securityCode"
                    label="CVV"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={securityCode}
                    error={formError && !securityCode}
                    helperText={formError && !securityCode ? "cvv is required" : ""}
                    onChange={(e) => setSecurityCode(e.target.value)}
                    inputProps={{ maxLength: 3 }} // limit input to 3 characters
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="The 3-digit code on the back of your card">
                            <InfoIcon fontSize="small" sx = {{color:'#1976d2'}} />
                          </Tooltip>
                        </InputAdornment>
                      )
                    }}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2}>
                    <TextField
                      required
                      id="expirationMonth"
                      name="expirationMonth"
                      label="MM"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      value={expirationMonth}
                      error={formError && !expirationMonth}
                      helperText={formError && !expirationMonth ? "exp month is required" : ""}
                      onChange={(e) => setExpirationMonth(e.target.value)}
                      inputProps={{ maxLength: 2 }} // limit input to 2 characters
                      />
                  </Grid>
                  <Grid item xs={2} sm={2}>
                    <TextField
                      required
                      id="expirationYear"
                      name="expirationYear"
                      label="YY"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      value={expirationYear}
                      error={formError && !expirationYear}
                      helperText={formError && !expirationYear ? "exp year is required" : ""}
                      onChange={(e) => setExpirationYear(e.target.value)}
                      inputProps={{ maxLength: 2 }} // Limit input to 2 characters
                      />
                      </Grid>
                  <Grid item xs={12} >
                    <Typography variant="subtitle2" gutterBottom sx = {{color:'#6f6f6f', textAlign: 'left'}}>
                      Expiration Date
                    </Typography>
                      </Grid>
                  </Grid>
                {/* </Grid> */}
              </Box>
            )}

            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0 || orderSubmitted}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {orderSubmitted ? (
          <Button onClick={handleGoHome}>
            Home
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Submit Order' : 'Next'}
          </Button>
        )}
      </Box>
          </Box>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={4} md={4} sx = {{marginTop: '35px'}}>
          <OrderSummary
            subtotal={408.28}
            discounts={0.41}
            tax={0.00}
            delivery={'FREE'}
            total={407.87}
            savings={85.41}
          />
        </Grid>

      </Grid>
    </ThemeProvider>
  );
};
