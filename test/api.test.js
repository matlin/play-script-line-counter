const supertest = require('supertest');
const test = require('tape');
const app = require('../index.js');
const server = supertest(app);

//get hoempage
test(t => {
  server
    .get('/')
    .expect('Content-Type', /html/)
    .expect(200)
    .expect('Content-Length', /^[1-9]\d*$/) //not zero
    .end((err, res) => {
      if (err) {
        t.fail();
        t.end();
      };
      if (res) {
        t.ok();        
        t.end();
      }
    });
}, {
  timeout: 500
});

//get valid xml analysis
test(t => {
  server
    .get('/api/analyze')
    .expect('Content-Type', /xml/)
    .expect(200)
    .expect('Content-Length', /^[1-9]\d*$/) //not zero
    .end((err, res) => {
      if (err) {
        t.fail();
        t.end();
      };
      if (res) {
        t.ok(res.body, 'Should respond with a body');
        t.end();
      }
    });
}, {
  timeout: 1000
});
