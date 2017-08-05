const expect = require('chai').expect;
const db = require('../../db');
const app = require('supertest')(require('../../app'));
describe('routes', ()=> {
  beforeEach(()=> {
    return db.sync()
      .then(db.seed);
  })
  describe('GET /users', ()=> {
    it('shows the users', ()=> {
      return app.get('/users')
        .expect(200)
        .then( res => {
          expect(res.text).to.contain('moe');
          expect(res.text).to.contain('Mentors 1');
        });
    });
  });
});
