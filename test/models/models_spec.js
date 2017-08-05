const expect = require('chai').expect;
const db = require('../../db');
const User = db.models.User;
const Award = db.models.Award;

describe('User', ()=> {
  let moe, larry, curly;
  beforeEach(()=> {
    return db.sync()
      .then(db.seed)
      .then( ([_moe, _larry, _curly]) => {
        moe = _moe;
        larry = _larry;
        curly = _curly;
      });
  })
  it('exists', ()=> {
    expect(User).to.be.ok;
  });

  it('there are three users', (done)=> {
    User.findAll()
      .then( users => {
        expect(users.length).to.equal(3);
        done();
      })
      .catch(done);
  });

  it('curly is mentored by moe', ()=> {
    expect(curly.mentor.name).to.equal('moe');
  });

  it('moe has two mentees', ()=> {
    expect(moe.mentees.length).to.equal(2);
  });

  it('moe has two awards', ()=> {
    expect(moe.awards.length).to.equal(2);
  });
});
