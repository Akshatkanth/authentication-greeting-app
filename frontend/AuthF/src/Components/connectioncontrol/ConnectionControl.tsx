import { useState, useEffect } from 'react';
import { Box, Switch, Typography, Paper } from '@mui/material';
import { getConnectionStatus, toggleConnection } from '../../api/config';

function ConnectionControl() {
  const [isConnected, setIsConnected] = useState(getConnectionStatus());

  // Update the state when connection status changes
  const handleToggle = () => {
    const newStatus = toggleConnection();
    setIsConnected(newStatus);
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        m: 2, 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: isConnected ? '#e8f5e9' : '#ffebee'
      }}
    >
      <Typography variant="body1">
        Backend Connection: {isConnected ? 'Enabled' : 'Disabled'}
      </Typography>
      <Switch
        checked={isConnected}
        onChange={handleToggle}
        color="primary"
      />
    </Paper>
  );
}

export default ConnectionControl;
