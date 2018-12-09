const request = require('supertest')
const app = require('../src/app')

describe('test app', () => {
  test('it should return 200 ok', () => {
    return request(app())
      .get('/api')
      .then(response => expect(response.statusCode).toBe(200))
  })
})
