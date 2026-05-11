// Import modules
const express = require('express');
const compression = require('compression');

// Create app
const app = express();

// ========== 1. COMPRESSION ==========
app.use(compression());

// ========== 2. RESPONSE TIME LOGGER ==========
app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${duration}ms`);
  });

  next();
});

// ========== 3. SIMPLE CACHE ==========
const cache = {};

const cacheMiddleware = (seconds) => {
  return (req, res, next) => {
    const key = req.url;

    if (cache[key]) {
      console.log('Cache HIT!');
      return res.json(cache[key]);
    }

    console.log('Cache MISS - fetching fresh data');

    const originalJson = res.json.bind(res);

    res.json = (data) => {
      cache[key] = data;

      setTimeout(() => {
        delete cache[key];
        console.log(`Cache cleared for ${key}`);
      }, seconds * 1000);

      return originalJson(data);
    };

    next();
  };
};

// ========== ROUTES ==========

// Home route
app.get('/', (req, res) => {
  res.send(`
    <h1>Performance Demo</h1>
    <ul>
      <li><a href="/api/fast">Fast Route</a></li>
      <li><a href="/api/slow">Slow Route (cached)</a></li>
      <li><a href="/api/data">Large Data (compressed)</a></li>
    </ul>
  `);
});

// Fast route
app.get('/api/fast', (req, res) => {
  res.json({ message: 'This is fast!', time: new Date() });
});

// Slow route with cache
app.get('/api/slow', cacheMiddleware(10), (req, res) => {
  setTimeout(() => {
    res.json({
      message: 'This was slow, but now cached!',
      data: 'Expensive calculation result',
      generatedAt: new Date()
    });
  }, 2000);
});

// Large data route
app.get('/api/data', (req, res) => {
  const largeData = [];

  for (let i = 0; i < 1000; i++) {
    largeData.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      description: 'Lorem ipsum dolor sit amet consectetur'
    });
  }

  res.json(largeData);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
});