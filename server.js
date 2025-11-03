const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure static file serving with proper options
app.use(express.static(__dirname, {
  etag: false,
  lastModified: false,
  acceptRanges: true,
  // Handle range errors gracefully
  setHeaders: (res, filePath) => {
    // Disable caching for video files to prevent range issues
    if (filePath.endsWith('.mp4') || filePath.endsWith('.webm') || filePath.endsWith('.ogg')) {
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Error handling middleware for range errors
app.use((err, req, res, next) => {
  if (err.status === 416 || err.name === 'RangeNotSatisfiableError') {
    // Silently handle range errors - browser will retry
    console.log('Range request handled');
    res.status(200).end();
  } else {
    next(err);
  }
});

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle all other routes by serving index.html (for single-page app)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Access at: http://localhost:${PORT}`);
  console.log(`🌐 External access: http://0.0.0.0:${PORT}`);
});
