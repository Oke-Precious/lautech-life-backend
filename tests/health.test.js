import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'http';
import app from '../src/app.js';

describe('LAUTECH Life Backend — Phase 1B Automated Test Suite', () => {
  let server;
  let baseUrl;

  before(async () => {
    // Launch an ephemeral test server instance
    await new Promise((resolve) => {
      server = http.createServer(app).listen(0, '127.0.0.1', () => {
        const address = server.address();
        baseUrl = `http://127.0.0.1:${address.port}`;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise((resolve) => {
      server.close(resolve);
    });
  });

  test('1. Health endpoint returns HTTP 200 OK', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.strictEqual(res.status, 200);
  });

  test('2. Health endpoint returns expected service information and JSON schema', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    const contentType = res.headers.get('content-type');
    assert.match(contentType, /application\/json/);

    const body = await res.json();
    assert.strictEqual(body.status, 'ok');
    assert.strictEqual(body.service, 'lautech-life-backend');
    assert.strictEqual(body.version, '0.1.0');
    assert.strictEqual(body.phase, '1B');
    assert.ok(body.timestamp, 'Timestamp field must be present');
  });

  test('3. Unknown API route returns a suitable 404 Not Found response', async () => {
    const res = await fetch(`${baseUrl}/api/non-existent-route`);
    assert.strictEqual(res.status, 404);

    const body = await res.json();
    assert.strictEqual(body.error, 'Not Found');
    assert.match(body.message, /Route not found/);
  });

  test('4. Root unknown route returns 404 Not Found', async () => {
    const res = await fetch(`${baseUrl}/random-endpoint`);
    assert.strictEqual(res.status, 404);
  });

  test('5. Server remains fully operational without Supabase credentials', async () => {
    // Verify that absent or null Supabase credentials do not crash or prevent health check responses
    const originalUrl = process.env.SUPABASE_URL;
    const originalKey = process.env.SUPABASE_PUBLISHABLE_KEY;
    const originalDb = process.env.DATABASE_URL;

    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_PUBLISHABLE_KEY;
    delete process.env.DATABASE_URL;

    try {
      const res = await fetch(`${baseUrl}/api/health`);
      assert.strictEqual(res.status, 200);
      const body = await res.json();
      assert.strictEqual(body.status, 'ok');
    } finally {
      if (originalUrl) process.env.SUPABASE_URL = originalUrl;
      if (originalKey) process.env.SUPABASE_PUBLISHABLE_KEY = originalKey;
      if (originalDb) process.env.DATABASE_URL = originalDb;
    }
  });
});
