import React, { useState } from 'react';
import { logEvent } from './LoggerMiddleware';

import { TextField, Button, Box, Typography } from '@mui/material';
import { isValidUrl, isValidShortCode } from '../utils/validation';

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [expiry, setExpiry] = useState(30);
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const handleShorten = () => {
    if (!isValidUrl(url)) {
      alert('Invalid URL');
      return;
    }
    if (shortCode && !isValidShortCode(shortCode)) {
      alert('Invalid shortcode (alphanumeric only)');
      return;
    }

    const newEntry = {
      longUrl: url,
      shortCode: shortCode || Math.random().toString(36).substring(2, 7),
      expiry: expiry,
      createdAt: new Date().toISOString(),
    };
    logEvent('URL Shortened', newEntry);

    setShortenedUrls([...shortenedUrls, newEntry]);
    setUrl('');
    setShortCode('');
    setExpiry(30);
  };

  return (
    <Box p={3}>
      <Typography variant="h4">React URL Shortener</Typography>

      <TextField label="Long URL" fullWidth margin="normal" value={url} onChange={e => setUrl(e.target.value)} />
      <TextField label="Custom Shortcode (optional)" fullWidth margin="normal" value={shortCode} onChange={e => setShortCode(e.target.value)} />
      <TextField label="Expiry (in minutes)" type="number" fullWidth margin="normal" value={expiry} onChange={e => setExpiry(e.target.value)} />

      <Button variant="contained" onClick={handleShorten}>Shorten</Button>

      <Box mt={3}>
        {shortenedUrls.map((item, index) => (
          <Box key={index} mb={2}>
            <Typography>Short URL: http://localhost:3000/{item.shortCode}</Typography>
            <Typography>Expires in: {item.expiry} minutes</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UrlShortener;
