import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    axios
      .post("/auth/register", {
        username,
        password,
      })
      .then(() => {
        navigate("/");
      })
      .catch(() => {});
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
          Register
        </Button>

        <Link to="/login">Already have an account? Login</Link>
      </Box>
    </Container>
  );
};

export default RegistrationPage;
