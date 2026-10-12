import http from 'http';
import app from './app.js';
import { env } from './config/env.js';

const PRIMARY_PORT = 4000;
const ALT_PORT = (process.env.PORT && parseInt(process.env.PORT, 10) !== PRIMARY_PORT)
  ? parseInt(process.env.PORT, 10)
  : 3000;
const HOST = '0.0.0.0';

// Initialize HTTP server
const server = http.createServer(app);

// Always listen on port 4000 as mandated by Phase 1B specification
server.listen(PRIMARY_PORT, HOST, () => {
  console.log(`[LAUTECH Life Backend] Server started in ${env.NODE_ENV} mode`);
  console.log(`[LAUTECH Life Backend] Primary port: http://${HOST}:${PRIMARY_PORT}`);
  console.log(`[LAUTECH Life Backend] Health check endpoint: GET http://${HOST}:${PRIMARY_PORT}/api/health`);
});

// If the execution environment requires another port (such as 3000 in container proxies),
// listen on ALT_PORT simultaneously so both port 4000 and the container check succeed.
if (ALT_PORT !== PRIMARY_PORT) {
  try {
    const envProxy = http.createServer(app);
    envProxy.listen(ALT_PORT, HOST, () => {
      console.log(`[LAUTECH Life Backend] Environment proxy active on http://${HOST}:${ALT_PORT}`);
    });
  } catch (_err) {
    // Non-fatal if auxiliary port is in use
  }
}

export default server;
