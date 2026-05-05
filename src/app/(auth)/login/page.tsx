import LoginForm from '@/components/LoginForm';
import { Box } from '@mui/material';

export default function LoginPage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
      <LoginForm />
    </Box>
  );
}