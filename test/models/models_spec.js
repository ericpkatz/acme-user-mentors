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

  it('there are four users', (done)=> {
    User.findAll()
      .then( users => {
        expect(users.length).to.equal(4);
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

  describe('remove award', ()=> {
    it('removes mentees if less than 2 awards', ()=> {
      return User.removeAward(moe.id, moe.awards[0].id)
        .then(()=> {
          return User.findAll({ where: { mentorId: moe.id } });
        })
        .then( mentees => expect(mentees.length).to.equal(0));

    });
  });

  describe('findUsersViewModel', ()=> {
    it('returns users and available mentors', ()=> {
      return User.findUsersViewModel()
        .then( model => {
          expect(model.users.length).to.equal(4);
          expect(model.availableMentorsMap).to.be.ok;
        });
    });
  });
});
