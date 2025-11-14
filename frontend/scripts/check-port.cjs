#!/usr/bin/env node
/**
 * Small helper that ensures the chosen dev port is available before we boot Next.js.
 * Next silently falls back to a random free port when the default (3000) is taken,
 * which makes it easy to open the wrong URL and hit the backend instead of the FE.
 * Failing fast keeps the port assignment explicit and prevents the confusing 404s.
 */
const net = require('node:net');

const DEFAULT_HOST = process.env.HOST || '0.0.0.0';
const rawPort = process.env.PORT || '3000';
const port = Number.parseInt(rawPort, 10);

if (Number.isNaN(port)) {
  console.error(`[dev] Invalid PORT value "${rawPort}".`);
  process.exit(1);
}

const server = net.createServer();

server.once('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error('');
    console.error(`[dev] Port ${port} is already in use.`);
    console.error(`The frontend expects to run at http://localhost:${port}.`);
    console.error('Close the process that is using this port or set PORT to a different value.');
    console.error('Tip: use `Get-NetTCPConnection -LocalPort', port, '` on PowerShell to inspect it.');
    process.exit(1);
  }

  console.error('[dev] Unexpected error while checking port availability.');
  console.error(error);
  process.exit(1);
});

server.once('listening', () => {
  server.close(() => process.exit(0));
});

server.listen({ port, host: DEFAULT_HOST });
