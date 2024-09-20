import request from 'supertest';
import app from '../../server/index';

test('GET /api/status', async () => {
  const response = await request(app).get('/api/status');
  expect(response.status).toBe(200);
  expect(response.body.message).toBe('API is up and running');
});
