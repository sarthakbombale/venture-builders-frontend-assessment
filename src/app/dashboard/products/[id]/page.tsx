'use client';
import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { useParams, useRouter } from 'next/navigation';
import { Container, Grid, Typography, Button, Card, CardMedia, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { selectedProduct, fetchSingleProduct, loading } = useStore();

  useEffect(() => {
    if (id) fetchSingleProduct(id as string);
  }, [id, fetchSingleProduct]);

  if (loading || !selectedProduct) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} sx={{ mb: 2 }}>
        Back to Products
      </Button>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={selectedProduct.images[0]}
              alt={selectedProduct.title}
              sx={{ height: 400, objectFit: 'contain' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>{selectedProduct.title}</Typography>
          <Chip label={selectedProduct.category} color="primary" sx={{ mb: 2 }} />
          <Typography variant="h4" color="secondary" gutterBottom>${selectedProduct.price}</Typography>
          <Typography variant="body1" paragraph>{selectedProduct.description}</Typography>
          <Typography variant="subtitle1"><strong>Brand:</strong> {selectedProduct.brand}</Typography>
          <Typography variant="subtitle1"><strong>Stock:</strong> {selectedProduct.stock} units</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}