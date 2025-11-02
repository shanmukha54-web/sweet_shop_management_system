import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Sweet } from "../context/CartContext";

interface SweetCardProps {
  sweet: Sweet;
  onAddToCart?: (sweet: Sweet) => void; // optional but used from Dashboard
}

const SweetCard: React.FC<SweetCardProps> = ({ sweet, onAddToCart }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#fee9f1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 220, // fixed height to keep boxes equal
        boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {sweet.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Category: {sweet.category}
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          ₹ {sweet.price}
        </Typography>
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => onAddToCart && onAddToCart(sweet)}
          sx={{ backgroundColor: "#7b1fa2", "&:hover": { backgroundColor: "#6a1b9a" } }}
        >
          ADD TO CART
        </Button>
      </Box>
    </Card>
  );
};

export default SweetCard;