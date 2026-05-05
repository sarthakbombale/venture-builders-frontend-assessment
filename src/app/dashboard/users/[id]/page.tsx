'use client';
import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { useParams, useRouter } from 'next/navigation';
import { Container, Paper, Typography, Button, Box, Avatar, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { selectedUser, fetchSingleUser, loading } = useStore();

  useEffect(() => {
    if (id) fetchSingleUser(id as string);
  }, [id, fetchSingleUser]);

  if (loading || !selectedUser) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} sx={{ mb: 2 }}>
        Back to Users
      </Button>
      <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar src={selectedUser.image} sx={{ width: 100, height: 100, mb: 2 }} />
        <Typography variant="h4">{selectedUser.firstName} {selectedUser.lastName}</Typography>
        <Typography color="text.secondary" gutterBottom>{selectedUser.email}</Typography>
        
        <Box sx={{ width: '100%', mt: 3 }}>
          <Divider sx={{ mb: 2 }} />
          <Typography><strong>Phone:</strong> {selectedUser.phone}</Typography>
          <Typography><strong>Company:</strong> {selectedUser.company?.name}</Typography>
          <Typography><strong>Address:</strong> {selectedUser.address?.address}, {selectedUser.address?.city}</Typography>
        </Box>
      </Paper>
    </Container>
  );
}