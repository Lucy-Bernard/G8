import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

type ShippingDetails = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
};

type PaymentDetails = {
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
};

type ReviewOrderProps = {
  shippingDetails: ShippingDetails;
  paymentDetails: PaymentDetails;
};

const ReviewOrder: React.FC<ReviewOrderProps> = ({
  shippingDetails,
  paymentDetails,
}) => {
  return (
    <Box sx={{mt: 5, width: "600px"}}>
      <Typography variant="h5" gutterBottom>
        Review and Place Order
      </Typography>
      <Typography variant="body1">
        Your order will not be placed until you click "Submit Order".
      </Typography>
      <Typography variant="body1">
        This will complete your order and charge your payment method for the
        total amount due.
      </Typography>
      <Divider sx={{my: 2}} />
      <Box>
        <Typography variant="h6" gutterBottom>
          Shipping Address
        </Typography>
        <Typography>
          {shippingDetails.firstName} {shippingDetails.lastName}
        </Typography>
        <Typography>{shippingDetails.address}</Typography>
        <Typography>
          {shippingDetails.city}, {shippingDetails.state}{" "}
          {shippingDetails.postalCode}
        </Typography>
        <Button variant="outlined" sx={{mt: 1}}>
          Change
        </Button>
      </Box>
      <Divider sx={{my: 2}} />
      <Box>
        <Typography variant="h6" gutterBottom>
          Payment Information
        </Typography>
        <Typography>{paymentDetails.cardNumber}</Typography>
        <Typography>
          Expires {paymentDetails.expirationMonth}/
          {paymentDetails.expirationYear}
        </Typography>
        <Button variant="outlined" sx={{mt: 1}}>
          Change
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewOrder;
