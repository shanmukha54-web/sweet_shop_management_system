import React, { useEffect, useState, ChangeEvent } from "react";
import { Container, Typography, Button, TextField, Box, Grid } from "@mui/material";
import api from "../api";
import SweetCard from "../components/sweetcard";
import { useCart, Sweet as SweetType } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [sweets, setSweets] = useState<SweetType[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<SweetType[]>([]);
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const token = localStorage.getItem("token");
        const resp = await api.get("/sweets", { headers: { Authorization: `Bearer ${token}` } });
        setSweets(resp.data);
        setFilteredSweets(resp.data);
      } catch (err) {
        console.error("Error fetching sweets:", err);
      }
    };
    fetchSweets();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredSweets(
      sweets.filter(
        s => s.name.toLowerCase().includes(value) || s.category.toLowerCase().includes(value)
      )
    );
  };

  const handleReset = () => {
    setSearch("");
    setFilteredSweets(sweets);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" align="center" sx={{ flex: 1 }}>
          🍬 Sweet Shop
        </Typography>

        <Button variant="outlined" onClick={() => navigate("/cart")} sx={{ ml: 2 }}>
          View Cart
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <TextField
          label="Search by name or category"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          sx={{ width: "50%", mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleReset}>
          Reset
        </Button>
      </Box>

      <Grid container spacing={3}>
        {filteredSweets.length > 0 ? (
          filteredSweets.map(sweet => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={sweet.id}>
              <SweetCard sweet={sweet} onAddToCart={addToCart} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography align="center" color="text.secondary">
              No sweets found. Try searching or add sweets from backend.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;