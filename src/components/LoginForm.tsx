'use client';
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { TextField, Button, Paper, Typography, Alert } from '@mui/material';

export default function LoginForm() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ username: 'emilys', password: 'emilyspassword' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        username: form.username,
        password: form.password,
        redirect: true,
        callbackUrl: "/dashboard/users",
      });

      if (result?.error) {
        setError("Invalid credentials. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Sign in failed", err);
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
      <Typography variant="h5" gutterBottom align="center">Admin Login</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button 
          fullWidth 
          variant="contained" 
          type="submit" 
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Paper>
  );
}