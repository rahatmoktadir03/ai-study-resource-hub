import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#1a1a1a', boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}>
      <Toolbar>
        <Typography variant="h6" style={{ color: '#0ff', textShadow: '0 0 5px rgba(0, 255, 255, 0.5)' }}>
          AI Study Resource Hub
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
