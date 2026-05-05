'use client';
import { useState, useEffect, useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { Product } from '@/types';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  Pagination,
} from '@mui/material';
import { useRouter } from 'next/navigation';

const ITEMS_PER_PAGE = 10;

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const { products, loading, fetchProducts } = useStore();
  const router = useRouter();

  useEffect(() => {
    const skip = (page - 1) * ITEMS_PER_PAGE;
    fetchProducts(ITEMS_PER_PAGE, skip, search, category);
  }, [page, search, category, fetchProducts]);

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = () => {
    setPage(1); // Reset to first page on search
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const memoizedProducts = useMemo(() => products, [products]);

  const categories = [
    'all',
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
    'furniture',
    'tops',
    'womens-dresses',
    'womens-shoes',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'womens-watches',
    'womens-bags',
    'womens-jewellery',
    'sunglasses',
    'automotive',
    'motorcycle',
    'lighting',
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products Management
      </Typography>
      <Box sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Search Products"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat.replace('-', ' ')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3}>
        {loading ? (
          <Grid item xs={12}>
            <Typography align="center">Loading...</Typography>
          </Grid>
        ) : (
          memoizedProducts.map((product: Product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                onClick={() => router.push(`/dashboard/products/${product.id}`)}
              >
                <CardMedia
                  component="img"
                  image={product.images[0]}
                  alt={product.title}
                  sx={{ height: 200, objectFit: 'contain' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {product.title}
                  </Typography>
                  <Chip label={product.category} size="small" sx={{ mb: 1 }} />
                  <Typography variant="h5" color="secondary">
                    ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stock: {product.stock}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={10} // DummyJSON has 100 products, 10 pages
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
}