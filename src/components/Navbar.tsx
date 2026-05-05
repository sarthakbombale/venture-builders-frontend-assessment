'use client';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Venture Builders Admin
        </Typography>
        <Box>
          <Button color="inherit" component={Link} href="/dashboard/users">
            Users
          </Button>
          <Button color="inherit" component={Link} href="/dashboard/products">
            Products
          </Button>
          <Button color="secondary" variant="contained" sx={{ ml: 2 }} onClick={() => signOut()}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}