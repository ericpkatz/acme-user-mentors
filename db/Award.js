const conn = require('./conn');

const Award = conn.define('award', {
  text: {
    type: conn.Sequelize.TEXT
  }
}, {
  hooks: {
    afterBulkDestroy: function(){
      console.log(arguments);
    }
  }
});

module.exports = Award;
