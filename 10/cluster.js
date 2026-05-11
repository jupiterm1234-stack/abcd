// Import cluster module (built-in)
const cluster = require('cluster');
const os = require('os');

// Get number of CPU cores
const numCPUs = os.cpus().length;

// Check if this is the master process
if (cluster.isPrimary) {

  console.log(`Master process ${process.pid} running`);
  console.log(`Forking ${numCPUs} workers...`);

  // Fork workers (one per CPU core)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker crashes
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log('Starting new worker...');
    cluster.fork(); // Restart worker
  });

} else {

  // Worker processes run the app
  require('./app.js');
  console.log(`Worker ${process.pid} started`);
}