import { useState } from 'react';
import { Box, Button, TextField, Typography, Container, CircularProgress, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../api/auth.services';

function Forms({ loginType }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await AuthService.login({
        email,
        password,
        userType: loginType
      });
      
      // Redirect to home page after successful login
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'white'
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          Login as {loginType}
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account? <Link to="/signup">Register</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Forms;
