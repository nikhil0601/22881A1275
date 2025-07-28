import React from 'react';
import { Box, Typography } from '@mui/material';

const UrlStats = () => {
  // In real app, this would pull from localStorage or server
  return (
    <Box p={3}>
      <Typography variant="h4">URL Statistics Page</Typography>
      <Typography>This is where shortened URLs and click data will be displayed.</Typography>
    </Box>
  );
};

export default UrlStats;
