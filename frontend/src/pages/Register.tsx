import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import api from "../api";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password, role: "USER" });
      setMessage("✅ Registered successfully! You can now log in.");
    } catch {
      setMessage("❌ Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom align="center">
          🧁 Sweet Shop Register
        </Typography>
        {message && (
          <Typography
            color={message.includes("failed") ? "error" : "primary"}
            sx={{ textAlign: "center", mb: 1 }}
          >
            {message}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
          <Button
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => (window.location.href = "/")}
          >
            Back to Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;