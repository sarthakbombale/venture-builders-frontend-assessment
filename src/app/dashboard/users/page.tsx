'use client';
import { useState, useEffect, useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { User } from '@/types';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  TablePagination,
  Avatar,
  Typography,
  Box,
} from '@mui/material';
import { useRouter } from 'next/navigation';

const ITEMS_PER_PAGE = 10;

export default function UsersPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const { users, loading, fetchUsers } = useStore();
  const router = useRouter();

  useEffect(() => {
    const skip = page * ITEMS_PER_PAGE;
    fetchUsers(ITEMS_PER_PAGE, skip, search);
  }, [page, search, fetchUsers]);

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = () => {
    setPage(0); // Reset to first page on search
  };

  const memoizedUsers = useMemo(() => users, [users]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Users Management
      </Typography>
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Search Users"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              memoizedUsers.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar src={user.image} alt={user.firstName} />
                  </TableCell>
                  <TableCell>{user.firstName} {user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => router.push(`/dashboard/users/${user.id}`)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={100} // DummyJSON has 100 users
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={ITEMS_PER_PAGE}
        rowsPerPageOptions={[ITEMS_PER_PAGE]}
      />
    </Container>
  );
}