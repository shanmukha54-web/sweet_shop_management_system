import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import { CartProvider } from "./context/CartContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Container>
      </CartProvider>
    </Router>
  );
};

export default App;